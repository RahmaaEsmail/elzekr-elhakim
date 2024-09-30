import React, { useEffect, useState } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './profile.css'
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContentLoader from 'react-content-loader';
const Profile = () => {
  const navigate=useNavigate()
  let localSize=localStorage.getItem('font_size_elzeker');
  let sizeData=localSize&&JSON.parse(localSize)
  let localData=localStorage.getItem('elzekr_data');
  let userData=localData&&JSON.parse(localData);
  const [data,setData]=useState({});
  const [lovedLitanies,setLovedLitanies]=useState([]);
  const [shareLitanies,setSharedLitanies]=useState([]);

  const [lovedRoquias,setLovedRoquias]=useState([]);
  const [shareRoquias,setShareRoquias]=useState([]);

  const [lovedHadiths,setLovedHadiths]=useState([]);
  const [sharedHadiths,setSharedHadiths]=useState([]);

  const [pageLoading,setPageLoading]=useState(false);
  const [activeEdit,setActiveEdit]=useState(false);
  const [siteFontSize,setSiteFontSize]=useState(22)
  const [shareLoading,setShareLoading]=useState(false)
  const eqData=()=>{
    if(sizeData!=null)
    setSiteFontSize(sizeData);
    else {
      setSiteFontSize(22)
    }
  }
  const handleChangeFontSize=(e)=>{
    localStorage.setItem('font_size_elzeker',JSON.stringify(siteFontSize));
    window.location.reload()
  }
  const style = {
    fontSize: `${siteFontSize}px !important`
  };
  const getMyLovesShares=()=>{
    setPageLoading(true)
    axios.get(BASE_URL+`get_shares_loves/${userData?.id}`)
    .then((res)=>{
    console.log(res.data.result)
      if(res.data.status=='success'){
        setData(res.data.result)
        setLovedLitanies(res.data.result?.lovedLitany)
        setSharedLitanies(res.data.result?.sharedLitany)
        setLovedRoquias(res.data.result?.lovedRoquies)
        setShareRoquias(res.data.result?.sharedRoquias)
        setSharedHadiths(res.data.result?.SharedHadith)
        setLovedHadiths(res.data.result?.lovedHadith)
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
    setPageLoading(false)
    })
  }

  const handleChangeLoveStatus=(id)=>{
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
        getMyLovesShares()
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
  const handleChangeLoveStatusRoquia2=(id)=>{
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
        getMyLovesShares()
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


  const handleShare1=(id)=>{
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
        getMyLovesShares()
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


  const handleChangeLoveStatusHadith=(id)=>{
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
        getMyLovesShares()
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


  const handleShare2=(id)=>{
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
        getMyLovesShares()
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

  const handleShare3=(id)=>{
    console.log(id)
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
        getMyLovesShares()
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
  useEffect(()=>{
    eqData()
    getMyLovesShares()
  },[])
  return (
    <>
      {
        pageLoading?(
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
          <div className='profile_page'>
      <div className='settings'>
        <h5 style={style}>حجم الخط</h5>
        <div className='font_slider_div' >
          <span>30</span>
          <Slider className='font_slider' min={22} max={30} value={siteFontSize} onChange={(e)=>{
            setSiteFontSize(e)
            // handleChangeFontSize(e)
            setActiveEdit(true)
          }}/>
          <span>22</span>
        </div>
        <button
          onClick={()=>{
            handleChangeFontSize()
          }}
          disabled={!activeEdit}
          className='btn btn-success'
        >تطبيق</button>
      </div>
      <div className="profile_content">
        <div>
          <h5>الرقيه الشرعيه</h5>
          <div className='roquias_person'>
            <div className='loves'>
            <h5>المفضله</h5>
              {
                lovedRoquias.map((item,index)=>{
                  return <div className={item.showVideo?'litany_one act':'litany_one'} key={index}>
                  <div className='actions'>
                    <img onClick={()=>{
                      navigate(`/litany/${item.roquia.id}`)
                      // handleShare(item.id)
                    }} src="/images/details.png" alt="" />
                    {/* <img src="/images/heart.png" alt="" /> */}
                  </div>
                  <h4>{true?item.roquia.title_ar:item.roquia.title_en}</h4>
                  <p>{true?item.roquia.description_ar:item.roquia.description_en}</p>
                  {/* <img onClick={()=>{
                    setRoquiesData(roquiesData.map((it)=>{
                      return {...it,showVideo:it.id==item.id?!it.showVideo:false}
                    }))
                  }} className='video_img' style={{width:'50px'}} src="/images/video.png" alt="" /> */}
                  {/* {!item.showVideo&&<img  className='show_video_img' src="/images/videoimg.jpg" alt="" />} */}
                  {
                    true&&(
                      <div className='video_div'>
                        <iframe
                          src={item.roquia.video_link}
                          frameborder="0"
                          height={'220px'}
                          width={'100%'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        >
                        </iframe>
                      </div>
                    )
                  }
                  {
                    true&&(
                      <audio controls={true}>
                        <source src={item.roquia.sound} type="audio/mpeg" />
                      </audio>
                    )
                  }
                    <div>
                        <img onClick={()=>{
                          handleChangeLoveStatusRoquia2(item.roquia.id)
                        }} style={{width:'30px',cursor:'pointer'}} src="/images/heart.png" alt="" />
                      </div>
                </div>
                })
              }
            </div>
            <div className='shared'>
              <h5>التى تم مشاركتها</h5>
              {
                shareRoquias.map((item,index)=>{
                  return <div className={item.showVideo?'litany_one act':'litany_one'} key={index}>
                  <div className='actions'>
                    <img onClick={()=>{
                      navigate(`/litany/${item.roquia.id}`)
                      // handleShare(item.id)
                    }} src="/images/details.png" alt="" />
                    {/* <img src="/images/heart.png" alt="" /> */}
                  </div>
                  <h4>{true?item.roquia.title_ar:item.roquia.title_en}</h4>
                  <p>{true?item.roquia.description_ar:item.roquia.description_en}</p>
                  {/* <img onClick={()=>{
                    setRoquiesData(roquiesData.map((it)=>{
                      return {...it,showVideo:it.id==item.id?!it.showVideo:false}
                    }))
                  }} className='video_img' style={{width:'50px'}} src="/images/video.png" alt="" /> */}
                  {/* {!item.showVideo&&<img  className='show_video_img' src="/images/videoimg.jpg" alt="" />} */}
                  {
                    true&&(
                      <div className='video_div'>
                        <iframe
                          src={item.roquia.video_link}
                          frameborder="0"
                          height={'220px'}
                          width={'100%'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        >
                        </iframe>
                      </div>
                    )
                  }
                  {
                    true&&(
                      <audio controls={true}>
                        <source src={item.roquia.sound} type="audio/mpeg" />
                      </audio>
                    )
                  }
                    {/* <img src="/images/share.png" style={{width:'40px'}} alt="" /> */}
                </div>

                })

              }

            </div>
          </div>
        </div>
        <div>
          <h5>الفجريات</h5>
          <div className='litany_person'>
            <div className='loved'>
              <h5>المفضله</h5>
              {
                lovedLitanies.map((item,index)=>{
                  return (
                    <div className='litany'>

                      {
                        item.litany.type=='sound'?
                        (
                          <audio controls={true}>
                            <source src={item.litany.sound} type="audio/mpeg" />
                          </audio>
                        )
                        :
                        (
                          <iframe
                          src={item.litany.video_link}
                          frameborder="0"
                          height={'220px'}
                          width={'100%'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        >
                        </iframe>
                        )
                      }
                      <h4>{true?item.litany.title_ar:item.title_en}</h4>
                      <p>{true?item.litany.description_ar:item.description_en}</p>
                      <div>
                        <img onClick={()=>{
                          handleChangeLoveStatus(item.litany.id)
                        }} style={{width:'30px',cursor:'pointer'}} src="/images/heart.png" alt="" />
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='shared'>
              <h5>المشاركه</h5>
              {
                shareLitanies.map((item,index)=>{
                  return (
                    <div className='litany'>

                      {
                        item.litany.type=='sound'?
                        (
                          <audio controls={true}>
                            <source src={item.litany.sound} type="audio/mpeg" />
                          </audio>
                        )
                        :
                        (
                          <iframe
                          src={item.litany.video_link}
                          frameborder="0"
                          height={'220px'}
                          width={'100%'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        >
                        </iframe>
                        )
                      }
                      <h4>{true?item.litany.title_ar:item.title_en}</h4>
                      <p>{true?item.litany.description_ar:item.description_en}</p>

                      {/* <img src="/images/share.png" style={{width:'40px'}} alt="" /> */}


                      {/* <div>
                        <img onClick={()=>{
                          handleChangeLoveStatus(item.litany.id)
                        }} style={{width:'30px',cursor:'pointer'}} src="/images/heart.png" alt="" />
                      </div> */}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className='hadiths'>
          <h5>الأحاديث</h5>
          <div>
            <div>
              <h5>المشاركه</h5>
              {
                  sharedHadiths.map((item,index)=>{
                    return <div >
                      <p>{item.hadith.hadith}</p>
                      {/* <img  src="/images/share.png" style={{width:'40px'}} alt="" /> */}
                    </div>
                  })
                }

            </div>
            <div>
              <h5>المفضله</h5>
              {
                lovedHadiths.map((item,idex)=>{
                  return <div>
                    <p>{item.hadith.hadith}</p>
                    <div>
                      <img style={{width:'40px',cursor:'pointer'}} onClick={()=>{
                        handleChangeLoveStatusHadith(item.hadith.id)
                      }} src="/images/heart.png" alt="" />
                    </div>
                  </div>
                })
              }
            </div>
            {/* <div>
              <h5>المفضله</h5>
              <div>
                {
                  lovedHadiths.map((item,index)=>{
                    return <div>
                      {item.hadith}
                    </div>
                  })
                }
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
        )
      }
    </>
  )
}

export default Profile
