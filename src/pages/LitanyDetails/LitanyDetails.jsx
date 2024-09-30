import React, { useEffect, useState } from 'react'
import './LitanyDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../constants'
import axios from 'axios'
import { ShareSocial } from 'react-share-social'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
const LitanyDetails = () => {
  const {id}=useParams()
  const navigate=useNavigate()
  let localData=localStorage.getItem('elzekr_data');
  let userData=localData&&JSON.parse(localData);
  const [pageLoading,setPageLoading]=useState(false)
  const [shareLoading,setShareLoading]=useState(false)
  const [litany,setLitany]=useState({})
  const [loveLoading,setLoveLoading]=useState(false)
  const get_litany=()=>{
    const data_send={
      user_id:userData.id
    }
    setPageLoading(true)
    axios.get(BASE_URL+`litany/litany_details/${id}?user_id=${userData?.id||0}`)
    .then((res)=>{
      console.log(res.data.result)
      if(res.data.status=='success'){
        setLitany(res.data.result)
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setPageLoading(false)
    })
  }

  useEffect(()=>{
    window.scrollTo(0, 0)
  },[])
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
    axios.post(BASE_URL+`litany/share_it/${id}`,data_send)
    .then((res)=>{
      if(res.data.status=='success'){
        get_litany()
        toast.success(res.data.message)
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
    axios.post(BASE_URL+`litany/love_it/${id}`,data_send)
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message)
        get_litany()
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
    get_litany()
  },[])
  return (
    <div className='litany_details_page'>
      {
        litany.type=='video'?
          <div className="litany_details">
                <iframe
                  src={litany.video_link}
                  frameborder="0"
                  height={'220px'}
                  width={'100%'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                >
                </iframe>
                <div className="details">
                  <h5>{litany?.title_ar}</h5>
                  <p>{litany?.description_ar}</p>
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
                      handleShare(litany.id)
                    }}
                    url ={`https://islamic-website-ten.vercel.app/litany/${id}`}
                    socialTypes={['facebook']}
                    />
                  </div>
                  {
                litany?.fav?
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
                litany?.share?
                (
                  <img  src="/images/share.png" style={{width:'40px'}} alt="" />
                )
                :
                (
                  <img   src="/images/not_share.png" style={{width:'40px'}} alt="" />
                )
              }
                  </div>
                )


              }


          </div>
      :
      <div className="litany_details">
    <div className="details">
                  <h5>{litany?.title_ar}</h5>
                  <p>{litany?.description_ar}</p>
                  <audio controls={true}>
                      <source src={litany.sound} type="audio/mpeg" />
                    </audio>
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
                        handleShare(litany.id)
                      }}
                      url ={`https://islamic-website-ten.vercel.app/litany/${id}`}
                      socialTypes={['facebook']}
                    />
                  </div>
                  {
                litany?.fav?
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
                litany?.share?
                (
                  <img src="/images/share.png" style={{width:'40px'}} alt="" />
                )
                :
                (
                  <img src="/images/not_share.png" style={{width:'40px'}} alt="" />
                )
              }


                  </div>
                )
              }

      </div>
      }
    </div>
  )
}

export default LitanyDetails
