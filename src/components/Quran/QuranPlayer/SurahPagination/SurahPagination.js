import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurahPagination = ({ surahNumber, versesPerPage }) => {
  const [verses, setVerses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const response = await axios.get(`https://api.quran.com/api/v4/chapters/${surahNumber}/verses`);
        setVerses(response.data.verses);
        const paginatedVerses = splitSurahIntoPages(response.data.verses, versesPerPage);
        setPages(paginatedVerses);
      } catch (error) {
        console.error('Error fetching surah data:', error);
      }
    };

    fetchSurah();
  }, [surahNumber, versesPerPage]);

  const splitSurahIntoPages = (verses, versesPerPage) => {
    const pages = [];
    for (let i = 0; i < verses.length; i += versesPerPage) {
      pages.push(verses.slice(i, i + versesPerPage));
    }
    return pages;
  };

  return (
    <div>
      <div>
        {pages.length > 0 && pages[currentPage].map((verse, index) => (
          <p key={index}>{verse.text_uthmani}</p>
        ))}
      </div>
      <div>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}>Previous</button>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1))}>Next</button>
      </div>
    </div>
  );
};

export default SurahPagination;