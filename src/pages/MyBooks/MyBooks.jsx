import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../constants'
import ContentLoader from 'react-content-loader';
import LibraryBanner from '../Library/LibraryBanner';

const MyBooks = () => {
  let localData=localStorage.getItem('elzekr_data');
  let userData=localData&&JSON.parse(localData);
  const [pageLoading,setPageLoading]=useState(false)
  const [books,setBooks]=useState([]);
  const [originalData,setOriginalData]=useState([]);
  const geMyBooks=()=>{
    setPageLoading(true)
    axios.get(BASE_URL+`libraries/get_my_books/${userData?.id||0}`)
    .then((res)=>{
      setBooks(res.data.result)
      setOriginalData(res.data.result)
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setPageLoading(false)
    })
  }

  const handleSearch=(txt)=>{
    let allData=[...originalData]
    let pushedData=[];
    for(let i=0;i<allData.length;i++){
      // console.log(i)
      if(allData[i].auther_name.includes(txt)||allData[i].book_name.includes(txt)||allData[i].description.includes(txt)){
        pushedData.push(allData[i]);
      }
    }
    setBooks(pushedData);
  }

  useEffect(()=>{
    geMyBooks()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  },[])
  return (
    <div className='my_books'>
      {
        pageLoading?
        (
          <div style={{height:"80vh",display:'flex',alignItems:'center',justifyContent:'center'}}>
            <ContentLoader
            viewBox="0 0 380 100"
            speed={1}
            // backgroundColor={'green'}
            >
              <rect x="10" y="10" rx="10" ry="10" width="100" height="80" />
              <rect x="120" y="10" rx="10" ry="10" width="100" height="80" />
              <rect x="230" y="10" rx="10" ry="10" width="100" height="80" />
            </ContentLoader>
          </div>
        )
        :
        (
          <>
          <LibraryBanner/>
          <h5 className='my-4 text-primary text-center'>مكتبتى</h5>

          {
        !pageLoading&&<div  style={{ width:'500px',maxWidth:'100%',margin:'auto' }} className='my-3 p-2'>
        <label htmlFor="">إبحث عن حديث</label>
        <input type="search" onChange={(e)=>{
          handleSearch(e.target.value)
        }} placeholder='إبحث هنا' className='form-control mt-2'/>
      </div>
      }
          <div className="books p-2">

            {
              books&&books.length>0?
              (
                books.map((item,index)=>{
                  return (
                    <div className="book">
                      <div className="img">
                        <img src={item.book_image} alt="" />
                      </div>
                      <div className="details">
                        <h2>{item.book_name}</h2>
                        <h5>{item.auther_name}</h5>
                        {
                          true?
                          (
                            <button
                              className='read_btn'
                              onClick={()=>{
                                window.open(item?.file,'blank')
                              }}
                            >
                            قراءه
                          </button>
                          )
                          :
                          null
                        }
                      </div>
                    </div>
                  )
                })
              )
              :
              (
                <div className='text-center d-flex align-items-center m-auto'>
                  <h5 className='text-center'>ما من كتب لك</h5>
                </div>
              )
            }
          </div>
          </>
        )
      }
    </div>
  )
}

export default MyBooks
