import React from 'react'
import { BASE_URL } from '../../constants'
import axios from 'axios';
import {useState,useEffect} from 'react'
import ContentLoader from 'react-content-loader';
import './RoquiaDetails.css'
import {ShareSocial} from 'react-share-social'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
const RoquiaDetails = () => {
  let localData=localStorage.getItem('elzekr_data');
  let userData=localData&&JSON.parse(localData);
  const navigate=useNavigate()
  // console.log("ewlew")
  const {id}=useParams()
  // console.log(id)
  const [pageLoading,setPageLoading]=useState(false)
  const [shareLoading,setShareLoading]=useState(false)
  const [roquia,setRoquia]=useState({})
  const get_roquia=()=>{
    setPageLoading(true)

    axios.get(BASE_URL+`roquias/get_roqua_details/${id}?user_id=${userData?.id||0}`)
    .then((res)=>{
      console.log(res)
      if(res.data.status=='success'){
        setRoquia(res.data.result)
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setPageLoading(false)
    })
  }
  const handleShare=()=>{
    if(userData==null){
      toast.warn('سجل أولا')
      navigate('/login')
      return
    }
    setShareLoading(true)
    const data_send={
      user_id:userData.id
    }
    axios.post(BASE_URL+`roquias/share_it/${id}`,data_send)
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message)
        get_roquia()
      }
      else if(res.data.status=='faild'){
        toast.error(res.data.message)
      }
      else {
        toast.error("حدث خطأ ما")
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setShareLoading(false)
    })
  }

  const handleChangeLoveStatus=()=>{
    if(userData==null){
      toast.warn('سجل أولا')
      navigate('/login')
      return
    }
    setShareLoading(true)
    const data_send={
      user_id:userData?.id
    }
    axios.post(BASE_URL+`roquias/love_it/${id}`,data_send)
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message)
        get_roquia()
      }
      else if(res.data.status=='faild'){
        toast.error(res.data.message)
      }
      else {
        toast.error('حدث خطأ ما')
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
    setShareLoading(false)
    })
  }
  useEffect(()=>{
    window.scrollTo(0, 0)
  },[])
  useEffect(()=>{
    get_roquia()
  },[])
  return (
    <div className='roquia_details_page'>
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
            <div className="roquia_details">
              <h4>
                  <span>إسم القارء: </span>
                  <span>{roquia.name}</span>
                </h4>
              <div className="img_reader">
                <img src={roquia.image}/>
              </div>
              <div className="content">

                <h5>{roquia.title_ar}</h5>
                <audio style={{width:'100%'}} autoFocus={true} onPlay={()=>{

                  }} controls={true}>
                  <source src={roquia.sound} type="audio/mpeg" />
                </audio>
                <iframe
                  src={roquia.video_link}
                  frameborder="0"
                  height={'500px'}
                  width={'100%'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              {
                shareLoading?
                (
                  <ThreeDots/>
                )
                :
                (
                  <div className="target_social">
                  <h2>أوامر</h2>
                  <div>
                  <ShareSocial
                      onSocialButtonClicked={()=>{
                        handleShare()
                      }}
                      url ={`https://islamic-website-ten.vercel.app/litany/${id}`}
                      socialTypes={['facebook']}
                    />
                  </div>
                  {
                roquia?.fav?
                (
                  <img onClick={()=>{
                    handleChangeLoveStatus()
                  }} style={{ width:'30px',cursor:'pointer' }} src="/images/heart.png" alt="" />
                )
                :
                (
                  <img onClick={()=>{
                    handleChangeLoveStatus()
                  }} style={{ width:'30px',cursor:'pointer' }} src="/images/not_heart.png" alt="" />
                )
              }
              {
                roquia?.share?
                (
                  <img  src="/images/share.png" style={{width:'40px'}} alt="" />
                )
                :
                (
                  <img  src="/images/not_share.png" style={{width:'40px'}} alt="" />
                )
              }
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

export default RoquiaDetails
