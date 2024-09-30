import React, { useEffect, useState } from 'react'
import './hajomar.css'
import HajOmraBanner from './HajOmraBanner'
import { studiesswiper } from '../../props/slidersprops'
import { Swiper, SwiperSlide } from 'swiper/react';
import { videosData } from './data';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import SwiperSlide
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ImagesGallery from './ImagesGallery';
import SoundsPage from './SoundsPage/SoundsPage';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import ContentLoader from 'react-content-loader';
const HajOmra = () => {
  const [videos,setVideos]=useState([]);
const [images,setImages]=useState([]);
const [voices,setVoices]=useState([]);
const [description,setDescription]=useState({});
const [infos,setInfos]=useState({})
const [pageLoading,setPageLoading]=useState(false)
const getData=()=>{
  setPageLoading(true)
  axios.get(BASE_URL+`videos/get_omra_hejj_page`)
  .then((res)=>{
    console.log(res.data)
    if(res.data.status=='success'){
      setImages(res.data.result.images)
      setVideos(res.data.result.videos)
      setVoices(res.data.result.voices);
      setInfos(res.data.result.richTxts);
      setDescription(res.data.result.description);
    }
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
    <>
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
          <div className='haj_omra'>
      <HajOmraBanner/>
        <div id='videos' className='videos'>
          <h5>
            <span>فديوهات توضيحيه</span>

          </h5>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // spaceBetween={50}
          // slidesPerView={3}
          {...studiesswiper}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {
            videos?.map((item,index)=>{
              console.log(item.video_link)
              return (
                <SwiperSlide
                >
                  <iframe
                    src={item.video_link}
                    frameborder="0"
                    height={'500px'}
                    width={'100%'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                </SwiperSlide>
              )
            })
          }
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </Swiper>
        {/* <button>عرض الكل</button> */}
        </div>
        <ImagesGallery imagesData={images}/>
        <SoundsPage
        voicesData={voices}
        />
        <div className='my-6 p-3 haj_om_steps'>
          <h5 style={{fontSize:'30px'}} className='text-center haj_om_steps_title'>خطوات الحج والعمره</h5>
          <div dangerouslySetInnerHTML={{ __html:description.text }}></div>
        </div>
        <div id='infos' className='more_exp'>
          <h5>مزيد من المعلومات</h5>
          <p dangerouslySetInnerHTML={{ __html: infos.text}}></p>
        </div>
    </div>
        )
      }
    </>
  )
}

export default HajOmra
