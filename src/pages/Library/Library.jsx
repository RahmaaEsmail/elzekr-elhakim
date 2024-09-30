import React, { useEffect, useState } from 'react'
import './library.css'
import LibraryBanner from './LibraryBanner'
import { booksData } from './data'
import ContentLoader from 'react-content-loader'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../../constants';
import { toast } from 'react-toastify'
import { fetchInfoData } from '../../store/userinfo'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const Library = () => {
  const navigate=useNavigate()
  const {language}=useSelector(s=>s.language);
  const dispatch=useDispatch();
  let localData=localStorage.getItem('elzekr_data');
  let userData=localData&&JSON.parse(localData);
  const [pageLoading,setPageLoading]=useState(false)
  const [books,setBooks]=useState([]);
  const [topics,setTopics]=useState([]);
  const [selecetedTopic,setSelectedTopic]=useState('');
  const [originalData,setOriginalData]=useState([]);
  const [buyloading,setBuyLoading]=useState(false);
  const getBooks=()=>{
    setPageLoading(true)
    axios.get(BASE_URL+`libraries/get_for_user/${userData?.id||0}`)
    .then((res)=>{
      console.log(res.data)
      if(Array.isArray(res.data.result)){
        setBooks(res.data.result.map((item,index)=>{
          return {...item,buyLoading:false}
        }))
        setOriginalData(res.data.result.map((item,index)=>{
          return {...item,buyLoading:false}
        }))
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setPageLoading(false)
    })
  }
  const handelBuy=(item)=>{
    if(userData==null){
      toast.warn('سجل أولا')
      navigate("/login")
      return
    }
    if(userData?.point*1<item?.points){
      toast.warn('ما تملكه لا يكفى')
      return;
    }
    setBuyLoading(true)
    const data_send={
      book_id:item.id,
      user_id:userData?.id,
    }
    setBooks(books?.map((it)=>{
      return {...it,buyLoading:it.id==item.id?true:it.buyLoading}
    }))
    axios.post(BASE_URL+'libraries/open_book',data_send,{
      headers:{
        lang:'ar'
      }
    })
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message)
        getBooks()
        dispatch(fetchInfoData())
      }
      else if(res.data.status=='faild'){
        toast.error(res.data.message)
      }
      else{
        toast.error('حدث خطأ ما')
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setBooks(books?.map((it)=>{
        return {...it,buyLoading:it.id==item.id?false:it.buyLoading}
      }))
    })
  }
  const getTopics=()=>{
    axios.get(BASE_URL+'libraries/get_topics')
    .then((res)=>{
      if(Array.isArray(res.data.result)){
        setTopics(res.data.result);
        if(res.data.result.length>0){
          setSelectedTopic(res.data.result[0].follow_to);
        }
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{

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
    window.scrollTo(0, 0)
    getTopics()
    getBooks()
  },[])
  return (
    <div className='library_page'>
      <LibraryBanner/>
      <div className='topics'>
        <h5>الأقسام</h5>
        <div className='topics_content'>
          {
            topics.map((item,index)=>{
              return (
                <p onClick={()=>{
                  setSelectedTopic(item.follow_to);
                }} className={item.follow_to==selecetedTopic?'active':''}>{item.follow_to}</p>
              )
            })
          }
        </div>
      </div>
      {
        !pageLoading&&<div style={{ width:'500px',maxWidth:'100%',margin:'auto' }} className='my-3'>
        <label style={{fontSize:'22px',fontWeight:'700'}} htmlFor="">إبحث عن كتاب</label>
        <input type="search" onChange={(e)=>{
          handleSearch(e.target.value)
        }} placeholder='إبحث هنا' className='form-control mt-2'/>
      </div>
      }
      <div className="books_content">
        <h5>الكتب المتاحه</h5>
        <div className="books">
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
              books&&books.length>0?
              <>
                {
                  books.filter((it)=>it.follow_to==selecetedTopic).map((item,index)=>{
                    return (
                      <div className="book">
                        <div className="img">
                          <img src={item.book_image} alt="" />
                        </div>
                        <div className="details">
                          <h2>{item.book_name}</h2>
                          {/* <p></p> */}
                          <h5>{item.auther_name}</h5>
                          {
                            item?.user_have?
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
                            (
                              <div className='text-center'>
                                {
                                  item.buyLoading?
                                  <>
                                    <Spinner/>
                                  </>
                                  :
                                  <button onClick={()=>{
                                    handelBuy(item)
                                  }} className='buy_btn btn  d-block w-100'>شراء</button>
                                }
                              </div>
                            )
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </>
              :
              <>
                <div>
                  لا يوجد كتب الأن
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Library
