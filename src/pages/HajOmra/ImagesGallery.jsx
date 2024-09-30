import React, { useEffect, useRef, useState } from 'react'
import './hajomar.css'
// import { imagesData } from './data';
import { SwiperSlide,Swiper } from 'swiper/react';
import { imagesSwiper, studiesswiper } from '../../props/slidersprops';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';
// import 'swiper/swiper-bundle.min.css';
import { BASE_URL } from '../../constants'
const ImagesGallery = ({imagesData}) => {
  const [images,setImages]=useState([]);

  const [audio,setAudio]=useState('');
  const [pageLoading,setPageLoading]=useState(false)
  // const []
  // const getImages=()=>{
  //   setImages(imagesData.map((item,index)=>{
  //     return {...item,overlay:false}
  //   }))
  // }

  const audioRef = useRef(null);

  // const handleSlideChange = (swiper) => {
  //   console.log(swiper)
  //   let activeImage=images.filter((ite,ind)=>ind==swiper.activeIndex)[0];


  //   if (audioRef.current && images && images[swiper.activeIndex]) {
  //     console.log(swiper.activeIndex)
  //     audioRef.current.src = images[swiper.activeIndex].sound;
  //     let allImages=[...images]
  //     setImages(allImages.map((item,index)=>{
  //       return {...item,overlay:index==swiper.activeIndex?true:false}
  //     }))
  //     audioRef.current.play();
  //   }
  //   setAudio(activeImage.sound);
  // }
  const eqData=()=>{
    setImages(imagesData)
  }
  const handleAudio=()=>{
    return (
    <>
      <audio  ref={audioRef}>
        <source src={audio} type="audio/mpeg" />
      </audio>
    </>
    )
  }
  useEffect(()=>{
    eqData()
    // getImages()
  },[])
  useEffect(()=>{

  },[audio])
  return (
    <div className='image_gallery' id='images'>
        <h4>معرض الصور</h4>
          {/* {console.log(audio)} */}
        {/* {
          handleAudio()
        } */}
      <Swiper
        className='imgSwiper'
        modules={[Navigation, Pagination, Scrollbar, A11y]}
          {...imagesSwiper}
          onSlideChange={(e) =>{

          }}
          // onSlideChangeTransitionEnd={handleSlideChange}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {
            imagesData?.map((item,index)=>{
              return (
                <SwiperSlide
                  className={"wjekwjjkwekjewkjkjew"}
                  onScroll={(e)=>{
                    console.log(e)
                    console.log('yes')
                  }}
                >
                  <div className='img_div'>
                    <img src={item.url} alt="" />
                    <div className={item.overlay?"overlay show":"overlay "}>
                      {/* <button
                        onClick={()=>{
                          setImages(images.map((item)=>{
                            return {...item,overlay:false}
                          }))
                          audioRef.current.pause();
                        }}
                      >توقف</button> */}
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
          }
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
      </Swiper>
      {/* {
        images.map((item,index)=>{
          console.log(item)
          return (
            <img src={item.image} alt="" />
          )
        })
      } */}
    </div>
  )
}

export default ImagesGallery
