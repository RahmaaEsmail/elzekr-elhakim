import React, { useEffect, useState } from 'react';
import "./style.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
const Pagination = ({  setPage,items,selectedPage, itemsPerPage, language }) => {
  console.log(items)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = items/itemsPerPage

  const getPageNumbers = () => {
    const maxVisiblePages = 3;
    let pagesArr=Math.ceil(items.length*1/10*1);
    console.log(itemsPerPage)
    console.log(items)
    console.log(pagesArr)
    const pages = [];
    const leftEllipsis = selectedPage > maxVisiblePages;
    const rightEllipsis = pagesArr - selectedPage > maxVisiblePages;

    if (!leftEllipsis) {
      for (let i = 1; i <= Math.min(pagesArr, maxVisiblePages); i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, '...');
      for (let i = selectedPage - 2; i <= selectedPage; i++) {
        pages.push(i);
      }
    }

    if (rightEllipsis) pages.push('...');

    return pages;
  };

  const handlePageChange = (page) => {
    if (page === '...') return;
    setCurrentPage(page);
    // setPage(page)
  };
  // useEffect(() => {
  //   setPage(currentPage)
  //   // setProducts(items?.slice((currentPage - 1) * 8, currentPage * 8));
  // }, [currentPage]);

  return (
    <div>
      <div className="pagination">
        <button
          onClick={() => {
            handlePageChange(currentPage + 1)
            setPage(selectedPage+1)
          }}
          disabled={((selectedPage === totalPages)||getPageNumbers().length==1)}
          className="pagination-button"
        >
          {language == "ar" ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
        {getPageNumbers()
          ?.reverse()
          .map((page, index) => (
            <button
              key={index}
              onClick={() => {
                handlePageChange(page)
                setPage(page)
                setPage(page)
              }}
              className={`pagination-button ${
                selectedPage === page ? 'active' : ''
              }`}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}

        <button
          onClick={() => {
            handlePageChange(currentPage - 1)
            setPage(selectedPage-1)
          }}
          disabled={selectedPage === 1}
          className="pagination-button"
        >
          {language != "ar" ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
