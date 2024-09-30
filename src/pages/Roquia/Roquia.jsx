import React, { useEffect, useState } from 'react'
import './Roquia.css'
import { roquiaContentData, roquiaTypeData } from './data';
import axios from 'axios';
import { BASE_URL } from '../../constants'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import {ShareSocial} from 'react-share-social'
const Roquia = () => {
  const navigate=useNavigate();
  const {language} =useSelector(s=>s.language)
  const [roquiestypes,setRoquiestypes]=useState([]);
  const [roquiesData,setRoquiesData]=useState([]);
  const [pageLoading,setPageLoading]=useState(false);
  const [selectedType,setSelectedType]=useState('');
  const getRoquiesTypes=()=>{
    setRoquiestypes(roquiaTypeData.map((item,index)=>{
      return{...item,selected:index==0?true:false}
    }));
    setSelectedType(roquiaTypeData[0].id)
    setRoquiesData(roquiaContentData.filter(item=>item.roq_id=roquiaTypeData[0].id).map((it)=>{
      return {...it,selected_sound:false,selected_video:false}
    }));
  }

  const FilterRoqiesData=()=>{
    setPageLoading(true)
    if(typeof(selectedType*1)=='number'){
      axios.get(BASE_URL+`roquias/get_by_filter_to_user/${selectedType}`)
      .then((res)=>{
        console.log(res)
        if(Array.isArray(res.data.result)){
          setRoquiesData(res.data.result);
        }
      }).catch(e=>console.log(e))
      .finally(()=>{
        setPageLoading(false)
      })
    }
    // setRoquiesData(roquiaContentData.filter(item=>item.roq_id==selectedType));
  }


  const getRoquiaTitles=()=>{
    axios.get(BASE_URL+`roquia_titles/get_for_user`)
    .then((res)=>{
      console.log(res.data)
      if(Array.isArray(res.data.result)){
        setRoquiestypes(res.data.result);
        if(res.data.result?.length>0){
          setSelectedType(res.data.result[0].id);
        }
      }
    }).catch(e=>console.log(e))
  }

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
    // getRoquiesTypes()
    getRoquiaTitles()
  },[])

  useEffect(()=>{
    FilterRoqiesData()
  },[selectedType])


  return (
    <div className='roquia_page'>
      {
        pageLoading?
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
        :
        <div className="roquia_content">
        <div className="filters">
          {
            roquiestypes&&roquiestypes.map((item,index)=>{
              return(
                <div onClick={()=>{
                  setSelectedType(item.id);
                  // setRoquiestypes(roquiestypes.map((it)=>{
                  //   return{...it,selected:it.id==item.id?true:false}
                  // }))
                }} key={index} className={item.id==selectedType?'roquia_type active':'roquia_type'}>
                  {language=='ar'?item.title_ar:item.title_en}
                </div>
              )
            })
          }
        </div>
        <div className="roquies">
          {
            roquiesData.map((item,index)=>{
              return(
                <div className='roquia_one' key={index}>
                  <div className="roquia">
                    <div className="right">
                      <img onClick={()=>{
                        navigate(`/roquia_details/${item.id}`,{state:{item}});
                      }} className='det_img' src="/images/details.png" alt="" />
                      <img src={item.image} alt="" />
                    </div>
                    <div className="left">
                      <h3>{item.title_ar}</h3>
                      <h5><span>{item.name}</span>/<span>{language=='ar'?roquiestypes.filter(it=>it.id==selectedType)[0].title_ar:roquiestypes.filter(it=>it.id==selectedType)[0].title_en}</span></h5>
                      {
                        item.selected_sound?
                        <div
                          className='img_actions'
                          style={{cursor:'pointer'}}

                        >
                          <img onClick={()=>{
                            setRoquiesData(roquiesData.map((roqItem)=>{
                              return{...roqItem,selected_video:roqItem.id==item.id?!roqItem.selected_video:false,selected_sound:false}
                            }))
                          }} src="/images/youtube.png" alt="" />
                          <img   onClick={()=>{
                            setRoquiesData(roquiesData.map((roqItem)=>{
                              return{...roqItem,selected_sound:roqItem.id==item.id?false:false,selected_video:false}
                            }))
                          }} src="/images/play.png" alt="" />
                          <img src="/images/share.png" alt="" />
                        </div>
                        :
                        <div className='img_actions'>
                          <img onClick={()=>{
                              setRoquiesData(roquiesData.map((roqItem)=>{
                                return{...roqItem,selected_video:roqItem.id==item.id?!roqItem.selected_video:false,selected_sound:false}
                              }))
                          }} src="/images/youtube.png" alt="" />
                          <img onClick={()=>{
                              setRoquiesData(roquiesData.map((roqItem)=>{
                                return{...roqItem,selected_sound:roqItem.id==item.id?true:false,selected_video:false}
                              }))
                          }} src="/images/play.png" alt="" />
                          <>
                          {/* <ShareSocial
                            url ={`https://github.com/sifatul/react-share-social`}
                            socialTypes={['facebook']}
                          /> */}
                            {/* <img src="/images/share.png" alt="" /> */}
                          </>
                        </div>
                      }
                        <audio style={{width:'100%'}} autoFocus={true} onPlay={()=>{
                          setRoquiesData(roquiesData.map((roqItem)=>{
                            return{...roqItem,selected_sound:roqItem.id==item.id?true:false,selected_video:false}
                          }))
                          }} controls={item.selected_sound}>
                          <source src={item.sound} type="audio/mpeg" />
                        </audio>
                    </div>
                  </div>
                  {
                    item.selected_video&&  <div className="video">
                    <iframe
                      src={item.video_link}
                      frameborder="0"
                      height={'500px'}
                      width={'100%'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  }
                </div>
              )
            })
          }
        </div>
      </div>
      }
    </div>
  )
}

export default Roquia
