import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Imams from './hadith_imam.json'
import './hadith.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import PopUp from '../popup';
import ContentLoader from 'react-content-loader';
import Pagination from '../../pagination';
import { useNavigate } from 'react-router-dom';
const Hadith = () => {
  const navigate=useNavigate()
  const [hadiths,setHadiths]=useState([]);
  const [pageLoading,setPageLoading]=useState(false);
  const [imams,setImams]=useState([]);
  const [pages,setPages]=useState([]);
  const [selectedImam,setSelectedImam]=useState('');
  const [rowData,setRowData]=useState({});
  const [page,setPage]=useState('');
  const [originalData,setOriginalData]=useState([]);
  const [showModal,setShowModal]=useState(false)
  const [limit,setLimit]=useState(20);
  const [selectedPage,setSelectedPage]=useState(1);
  const getImams=()=>{
    axios.get("https://hadith.camp-coding.site/imam/getAll")
    .then((res)=>{
      if(Array.isArray(res.data.message)){
        setImams(res.data.message)
        if(res.data.message.length>0){
          setSelectedImam(res.data.message[0].id)
        }
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{})
  }
  const getHadiths=()=>{
    setPageLoading(true)
    axios.get(`https://hadith.camp-coding.site/hadith/get?imam_id=${selectedImam}&limit=${limit}&page=${selectedPage}`)
    .then((res)=>{
      if(Array.isArray(res.data.message.data)){
        // setPages();
        let pushedArr=[];
        for(let i=1;i<=res.data.message.numberOfPages;i++){
          // setPages([...pages,i])
          pushedArr.push(i);
        }
        setPages(pushedArr)
        setHadiths(res.data.message.data.map((item,index)=>{
          return{...item,description:`<p>${item.hadith.substring(0, 100)+'.....'}`+`<span class="ellipsis${index} ellipsis">عرض المزيد</span></p>`,originalDescription:item.hadith}
        }));
        setOriginalData(res.data.message.data.map((item)=>{
          return{...item,description:item.hadith.substring(0, 100)+'.....',originalDescription:item.hadith}
        }))
      }
    }).catch((e)=>{
      console.log(e)
    })
    .finally(()=>{
      setPageLoading(false)
    })
    // setHadiths(hadithsData.map((item,index)=>{
    //   return{...item,description:`<p>${item.description.substring(0, 100)+'.....'}`+`<span class="ellipsis${index} ellipsis">عرض المزيد</span></p>`,originalDescription:item.description}
    // }));
    // setOriginalData(hadithsData.map((item)=>{
    //   return{...item,description:item.description.substring(0, 100)+'.....',originalDescription:item.description}
    // }))
  }


  useEffect(()=>{
    let summary = document.getElementsByClassName('description')
    // console.log(summary)
    if(summary!=null){
      for(let i=0;i<summary.length;i++){
        summary[i].innerHTML=`<p style="margin:0;">${summary[i].innerHTML}<span class='ellipsis${i} ellipsis'>... عرض المزيد</span></p>`;
      }
    }
    window.scrollTo(0, 0)

  },[])
  let showMore=document.getElementsByClassName(`ellipsis`);
    if(showMore!=null){
      for(let i=0 ;i<showMore.length;i++){
        showMore[i].addEventListener('click',function(){
          setRowData(hadiths[i]);
          setShowModal(true);
        })
      }
    }
  const handleSearch=(txt)=>{
    let allData=[...originalData]
    let pushedData=[];
    for(let i=0;i<allData.length;i++){
      // console.log(i)
      if(allData[i].searchItem.includes(txt)){
        pushedData.push(allData[i]);
      }
    }
    setHadiths(pushedData);
  }
  useEffect(()=>{
    getHadiths()
  },[selectedImam,selectedPage])
  useEffect(()=>{
    getImams()
  },[]);
  return (
    <div className='hadith_page'>
      {
        !pageLoading&&<div className='my-3'>
        {/* <label htmlFor="">إبحث عن حديث</label> */}
        <div className='search_div'>
          <FaMagnifyingGlass />
          <input type="search" onChange={(e)=>{
            handleSearch(e.target.value)
          }} placeholder='إبحث هنا' className='form-control mt-2'/>
        </div>
      </div>
      }
      <h5>الأئمه</h5>
      <div className="imams">
        {
          imams&&imams.map((item,index)=>{
            return(
              <div onClick={()=>{
                setSelectedImam(item.id);
              }} className={item.id==selectedImam?'imam active':'imam'}>
                {item.name}
              </div>
            )
          })
        }
      </div>

      <div className='hadiths_content'>
        <h5>الأحاديث</h5>
        <div className="hadiths">
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
                {
                  hadiths.map((item,index)=>{
                    return(
                      <div onClick={()=>{
                        navigate(`/hadith_details/${item.id}`)
                        // setShowModal(true)
                        //         setRowData(item)
                      }} className='hadith_item' key={index}>
                        <div>
                          <p>
                            <span>{item.originalDescription.substring(0,150)} </span>
                            <span
                              style={{ cursor:'pointer',color:'black' }}
                              onClick={()=>{
                                setShowModal(true)
                                setRowData(item)
                              }}
                            >
                              <span>... </span>
                              <span>عرض المزيد </span>
                            </span>
                          </p>
                          {/* <h3>{item.hadith}</h3> */}
                          {/* <p  className='description' dangerouslySetInnerHTML={{ __html:item.description }}></p> */}
                        </div>
                      </div>
                    )
                  })
                }
                {/* <div className='pages'>
                  <IoChevronForward
                    onClick={()=>{
                      if(selectedPage>1){
                        setSelectedPage(selectedPage*1-1);
                      }
                    }}
                  />
                  {
                    pages&&Array.isArray(pages)&&pages.map((page,ind)=>{
                      return <p onClick={()=>{
                        setSelectedPage(page);
                      }} className={page==selectedPage?'active':''}>{page}</p>
                    })
                  }
                  <IoChevronBackSharp
                    onClick={()=>{
                      if(selectedPage<pages.length){
                        setSelectedPage(selectedPage*1+1)
                      }
                    }}
                  />
                </div> */}

              </>
            )
          }
        </div>
      {
        hadiths.length>0&&  <Pagination items={hadiths} pagesArr={pages.length} itemsPerPage={limit} selectedPage={selectedPage} language={'ar'} setPage={(pa)=>{
          setSelectedPage(pa)
        }}/>
      }
      </div>
      <PopUp
        open={showModal}
        setOpen={setShowModal}
        title={`عرض بيانات الحديث`}
      >
        <div className="tasbih tasbih_pop">
          <h5>{rowData.hadith}</h5>
          {/* <p>{rowData.originalDescription}</p> */}
        </div>
      </PopUp>
    </div>
  )
}

export default Hadith
