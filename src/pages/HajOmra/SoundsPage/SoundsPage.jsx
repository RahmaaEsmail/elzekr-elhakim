import React, { useEffect, useState } from 'react'
import './soundspage.css'
import { soundsData } from '../data';
import PopUp from '../../popup/index';
const SoundsPage = ({voicesData}) => {
  const [sounds,setSounds]=useState([]);
  const [showMore,setShowMore]=useState(false);
  const [rowData,setRowData]=useState({});
  const getSounds=()=>{
    setSounds(voicesData.map((item)=>{
      return{...item,description:`<span  style="display:'flex'"><span>${item.description_ar.substring(0,60)}</span>...<span class="${item.className}">عرض المزيد</span></span>`,originalDescription:item.description_ar}
    }));
  }
  let haj_class=document.querySelector('.haj_class')
  if(haj_class!=null){
    haj_class.addEventListener('click',function(){
      console.log('wewe')
      setRowData({...sounds[0]});
      setShowMore(true)
    })
  }

  let omra_class=document.querySelector('.omra_class')
  // console.log(omra_class)
  if(omra_class!=null){
    omra_class.addEventListener('click',function(){
      console.log('wewe')
      setRowData({...sounds[1]});
      setShowMore(true)
    })
  }
  console.log(omra_class)
  useEffect(()=>{
    getSounds()
  },[])
  return (
    <div className='sounds_page' id='sounds'>
      <div>
        <h4>التعليق الصوتى</h4>
      </div>
      <div className="explains">
        {
          sounds&&sounds.map((item,index)=>{
            return(
              <div className='explain_div' key={index}>
                <h3>{item.title_ar}</h3>
                <div className='det_mor'>
                  <p /* dangerouslySetInnerHTML={{ __html:item.description }} */>
                    <span>{item.originalDescription.substring(0,100)}</span>
                    <span>...</span>
                    <span
                    style={{cursor:'pointer'}}
                      onClick={()=>{
                        setRowData({...item});
                    setShowMore(true)
                      }}
                    >عرض المزيد</span>
                  </p>
                  <span>{}</span>
                {/* <div className="gradient">
                </div> */}
                </div>
                <audio controls={true}>
                  <source src={item.sound} type="audio/mpeg" />
                </audio>
                {/* <button onClick={()=>{
                  setRowData(item)
                  setShowMore(true)
                }} className='how_more'>عرض التفاصيل</button> */}
              </div>
            )
          })
        }
      </div>
      <PopUp
        open={showMore}
        setOpen={setShowMore}
        title={`تفاصيل أكثر عن ${rowData.title_ar}`}
      >
        <div className="des">
          <p>
            {rowData.originalDescription}
          </p>
        </div>
      </PopUp>
    </div>
  )
}

export default SoundsPage
