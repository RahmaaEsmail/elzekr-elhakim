import React, { useEffect, useState } from 'react'
import './HadithDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import { ShareSocial } from 'react-share-social';
import { ThreeDots } from 'react-loader-spinner';
const HadithDetails = () => {
  const navigate=useNavigate()
  let localData=localStorage.getItem('elzekr_data');
  let userData=localData&&JSON.parse(localData);
  const {id}=useParams();
  const [hadith,setHadith]=useState({})
  const [pageLoading,setPageLoading]=useState(false)
  const [shareLoading,setShareLoading]=useState(false)
  const getHadith=()=>{
    const data_send={
      user_id:userData.id
    }
    setPageLoading(true)
    axios.post(BASE_URL+`hadiths/get_hadith_details/${id}`,data_send)
    .then((res)=>{
      // console.log(res)
      // console.log(res.data.result,"ewwe")
      if(res.data.status=='success'){
        setHadith(res.data.result)
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setPageLoading(false)
    })
  }

  const handleShare=()=>{
    // console.log(id)
    if(userData==null){
      toast.warn('سجل أولا')
      navigate('/login')
      return
    }
    setShareLoading(true)
    const data_send={
      user_id:userData.id
    }
    axios.post(BASE_URL+`hadiths/share_it/${id}`,data_send)
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message)
        getHadith()
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
    axios.post(BASE_URL+`hadiths/love_it/${id}`,data_send)
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message)
        getHadith()
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
    getHadith()
  },[])
  return (
    <div className='hadith_page'>
      <div className="hadith_content">
        {/* {console.log(hadith)} */}
        <h5>{hadith.hadith}</h5>
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
                        handleShare(hadith.id)
                      }}
                      url ={`https://islamic-website-ten.vercel.app/hadith_details/${id}`}
                      socialTypes={['facebook']}
                    />
                  </div>
                  {
                hadith?.fav?
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
                hadith?.share?
                (
                  <img  src="/images/share.png" style={{width:'40px'}} alt="" />
                )
                :
                (
                  <img   src="/images/not_share.png" style={{width:'40px',}} alt="" />
                )
              }
                  </div>

                )

              }

      </div>
    </div>
  )
}

export default HadithDetails
