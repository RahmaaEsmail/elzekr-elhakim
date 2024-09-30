import React, { useEffect, useState } from 'react'
import '../Roquia/Roquia.css'
import { LitaniesData } from './data';
import './Litanies.css'
import { BASE_URL } from '../../constants';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ContentLoader from 'react-content-loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { Language } from '@mui/icons-material';
// import { roquiaContentData, roquiaTypeData } from './data';
const Litanies = () => {
  let localData=localStorage.getItem('elzekr_data');
  let userData=localData&&JSON.parse(localData);
  const navigate=useNavigate()
  const [shareLoading,setShareLoading]=useState(false)
  const {language}=useSelector(s=>s.language);
  const [roquiestypes,setRoquiestypes]=useState([]);
  const [roquiesData,setRoquiesData]=useState([]);
  const [pageLoading,setPageLoading]=useState(false);
  const [selectedType,setSelectedType]=useState('');

  const getData=()=>{
    // setRoquiesData(LitaniesData.map((item)=>{
    //   return {...item,showVideo:false}
    // }));
    setPageLoading(true)
    axios.get(BASE_URL+`litany/get_for_user`)
    .then((res)=>{
      console.log(res.data)
      setRoquiesData(res.data?.result.map((item,index)=>{
        return {...item,showVideo:false}
      }))
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setPageLoading(false)
    })
  }
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
    getData()
  },[])

  return (
    <div className='roquia_page'>
      {
        pageLoading?
        (
          <div>
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
          roquiesData.length>0?
        (
          <div className="roquia_content">
        <h5>فجريات واشراقه</h5>
        <div className="litanies_boxs">
          <div className="right_box">
          {
            roquiesData&&roquiesData.filter(it=>it.type=='sound').map((item,index)=>{
              return(
                <div className='litany_one sound_item' key={index}>
                  <div className='actions'>
                    <img onClick={()=>{
                      navigate(`/litany/${item.id}`)
                      // handleShare(item.id)
                    }} src="/images/details.png" alt="" />
                    {/* <img src="/images/heart.png" alt="" /> */}
                  </div>
                  <div>
                  <h4>{language=='ar'?item.title_ar:item.title_en}</h4>
                  <p>{language=='ar'?item.description_ar:item.description_en}</p>
                  {/* <img className='img_audio' style={{width:'50px'}} src="/images/play.png" alt="" /> */}
                  </div>
                  {/* <div>
                    <audio controls={true}>
                      <source src={item.sound} type="audio/mpeg" />
                    </audio>
                  </div> */}
                </div>
              )
            })
          }
          </div>
          <div className="left_box">
          {
            roquiesData&&roquiesData.filter(it=>it.type=='video').map((item,index)=>{
              return <div className={item.showVideo?'litany_one act':'litany_one'} key={index}>
                  <div className='actions'>
                    <img onClick={()=>{
                      navigate(`/litany/${item.id}`)
                      // handleShare(item.id)
                    }} src="/images/details.png" alt="" />
                    {/* <img src="/images/heart.png" alt="" /> */}
                  </div>
                  <h4>{language=='ar'?item.title_ar:item.title_en}</h4>
                  <p>{language=='ar'?item.description_ar:item.description_en}</p>
                  {/* <img onClick={()=>{
                    setRoquiesData(roquiesData.map((it)=>{
                      return {...it,showVideo:it.id==item.id?!it.showVideo:false}
                    }))
                  }} className='video_img' style={{width:'50px'}} src="/images/video.png" alt="" /> */}
                  {/* {!item.showVideo&&<img  className='show_video_img' src="/images/videoimg.jpg" alt="" />} */}
                  {/* {
                    true&&(
                      <div className='video_div'>
                        <iframe
                          src={item.video_link}
                          frameborder="0"
                          height={'220px'}
                          width={'100%'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        >
                        </iframe>
                      </div>
                    )
                  } */}
                </div>

            })
          }
          </div>
          </div>
        {/* <div className="litanies">
          {
            roquiesData.map((item,index)=>{
              return(
                <div className='litany_one' key={index}>
                  <h4>{Language=='ar'?item.title_ar:item.title_en}</h4>
                  <p>{Language=='ar'?item.description_ar:item.description_en}</p>

                </div>
              )
            })
          }
        </div> */}
      </div>
        )
        :
        (
          <div>
            <h5>لا يوجد بيانات</h5>
          </div>
        )
        )
      }
    </div>
  )
}

export default Litanies
