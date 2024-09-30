// import { Box, Container } from '@mui/material'
// import React from 'react'
// import PrayerTimesRow from './PrayerTimesRow';
// import { v4 as uuid } from 'uuid';
// import PrayerTimesHeaderRow from './PrayerTimesHeaderRow';
// import PrayerTimeLine from './PrayerTimeLine';

// const moment = require('moment-hijri');

// export default function PrayerTimesTable({ timezone, prayerTimes }) {
//   // Object.entries(prayerTimes).map(([key,value])=>{
//   //   console.log(key,"   -----   ",value)
//   // })
//   const higri_date = JSON.parse(localStorage.getItem("higri_date")) ||  0;

//   const hijriDate = moment().format('iYYYY-iM-iD');
// //   const x = moment().format('iD-iM-iYYYY');
//   console.log(hijriDate);
// //   const [day , month , year] = hijriDate.split("-");
//     //  console.log(day); 
//     // const newDate = `${year}-${month}-${day}`;
//     // console.log(newDate);
//     const date = new Date(hijriDate);
//     console.log(date);
//     const formattedDate = new Date(date.getTime() + 86400 * 1000 * higri_date)
//     console.log(formattedDate);

//     const year = formattedDate.getFullYear();
//     const month = formattedDate.getMonth() + 1;
//     const day = formattedDate.getDate();

//     return (
//         <Box>
//             <h2 style={{display:"flex",alignItems:"center" , fontSize:"27px"}}>
//                 <span style={{fontSize:"27px"}}>التاريخ الهجري : </span>
//                 <span style={{fontSize:"27px"}}>{`${year}-${month}-${day}`}</span>
//             </h2>
//           <PrayerTimeLine prayerTimes={prayerTimes}/>
//             {/* <Container maxWidth="sm" sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 flexDirection: 'column',
//                 border: '2px solid',
//                 borderColor: 'quranPlayer.main',
//                 borderRadius: '20px',
//                 gap: 1,
//                 pb: 3,
//                 pt: 1,
//                 backgroundColor: 'primary.contrastText',
//             }}>
//                 <PrayerTimesHeaderRow timezone={timezone} />

//                 {Object.entries(prayerTimes).map(([key, value]) => {
//                     return (
//                         <PrayerTimesRow
//                             key={uuid()}
//                             prayerName={key}
//                             prayerTime={value} />
//                     )
//                 }
//                 )}
//             </Container> */}
//         </Box>
//     )
// }


import { Box, Container } from '@mui/material'
import React, { useState,useEffect } from 'react'
import PrayerTimesRow from './PrayerTimesRow';
import { v4 as uuid } from 'uuid';
import PrayerTimesHeaderRow from './PrayerTimesHeaderRow';
import PrayerTimeLine from './PrayerTimeLine';
import { FaRegTrashCan } from "react-icons/fa6";
import {IoChevronUp, IoChevronDown } from "react-icons/io5";
import quranArr from '../../../../quran.json';
import { toast } from 'react-toastify';
const moment = require('moment-hijri');
export default function PrayerTimesTable({ timezone, prayerTimes }) {

  let localPushedKhatmaData=localStorage.getItem('pushLocalStorageData');
  let pushedKhatmaData=localPushedKhatmaData&&JSON.parse(localPushedKhatmaData)


  // Object.entries(prayerTimes).map(([key,value])=>{
  //   console.log(key,"   -----   ",value)
  // })
  // console.log(quranArr)
  const higri_date = JSON.parse(localStorage.getItem("higri_date")) ||  0;

  const hijriDate = moment().format('iYYYY-iM-iD');
//   const x = moment().format('iD-iM-iYYYY');

//   const [day , month , year] = hijriDate.split("-");
    //  console.log(day);
    // const newDate = `${year}-${month}-${day}`;
    // console.log(newDate);
    const date = new Date(hijriDate);
    const formattedDate = new Date(date.getTime() + 86400 * 1000 * higri_date)


    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();

    const [showKhatma,setShowKhatma]=useState(false);

    const [khatmaDays,setKhatmaDays]=useState('');
    const [pagesNumber,setPageNumber]=useState('');

    const [fromStr,setFromStr]=useState('')
    const [toStr,setToStr]=useState('')

    const [decimalDays,setDecimalDays]=useState('');
    const [days,setDays]=useState('');

    const [khatmaAya,setKhatmaAya]=useState({});
    const [khatmaSurah,setKhataSurah]=useState({});

    const [showFromTo,setShowFromTo]=useState(false);
    const [handleRemoveClick,setHandleRemoveClick]=useState(true)

    const [surahNumber,setSurahNumber]=useState('')
    const [ayahNumber,setAyahNumber]=useState('');
    const [showenData,setShowenData]=useState();
    const [times,setTimes]=useState(0);
    const [totalDayes,setTotalDayes]=useState();
    const [currentDay,setCurrentDay]=useState([])
    const [readenPages,setReadenPages]=useState(0)

    const [totalPages,setTotalPages]=useState(0);
    const [currentTi,setCurrentTi]=useState(1);

    // let [pushLocalStorageData,setPushLocalStorageData]=useState({})

    const handleMakeKhatma=()=>{
      if(khatmaDays==''){
        return
      }



      // console.log(quranArr)
      // console.log("days",days);
      // console.log("decimalDays",decimalDays)
      // console.log("pagesNumber",pagesNumber)
      // console.log("khatmaDays",khatmaDays)

      // let result = [];
      // let currentPage = 1;
      // for (let day = 1; day <= days; day++) {
      //   let pagesToday = days*1;
      //   // console.log(pagesToday)
      //   // return
      //   // توزيع الصفحات المتبقية بالتساوي على الأيام الأولى
      //   if (day <= decimalDays) {
      //     pagesToday += 1;
      //   }

      //   let endPage = currentPage + pagesToday - 1;

      //   result.push({
      //     day: day,
      //     startPage: currentPage,
      //     endPage: endPage,
      //     totalPages: pagesToday
      //   });

      //   currentPage = endPage + 1; // تحديث الصفحة للقراءة التالية
      // }
      // console.log(result)


      let obj=[];
      let remainNumber=decimalDays;

      for(let i=1;i<=khatmaDays*1;i++){
        if(remainNumber>0){
          obj[i]=pagesNumber;
        }
        else {
          obj[i]=days;
        }
        remainNumber-=1
      }
      obj.shift()
      console.log(obj)

      const result = [];
  let currentPage = 1;
  let currentDay = 0;
    localStorage.setItem('pages_obj',JSON.stringify(obj))
    setTotalPages(obj.length)
    setCurrentTi(1)
  // البدء بتوزيع الآيات
  obj.forEach((pagesForDay, index) => {
    let ayatForDay = [];

    quranArr.forEach(surah => {
      surah.ayahs.forEach(ayah => {
        // console.log(surah)
        // return
        ayah['surah_title']=surah['name']
        // إذا كانت الصفحة الحالية ضمن نطاق اليوم الحالي
        if (ayah.page >= currentPage && ayah.page < currentPage + pagesForDay) {
          ayatForDay.push(ayah);
        }
      });
    });

    result.push({ day: index + 1, ayat: ayatForDay });
    currentPage += pagesForDay;
  });
  setCurrentDay(result[0]['ayat'])
  localStorage.setItem('quranKhatma',JSON.stringify(result));
  localStorage.setItem('timeKhatma',1);
  setShowenData(result);
  setTimes(1)
    }


    useEffect(()=>{
      if(khatmaDays!=''){
        let dividded=(604/khatmaDays*1)*1;
        let correct_number=Math.floor(dividded);

        let dayes_decimal=(604%khatmaDays*1)*1
        setDecimalDays(dayes_decimal);

        setDays(correct_number)

        setPageNumber(dayes_decimal>0?correct_number*1+1:correct_number);
        // setPushLocalStorageData({
        //   ...pushLocalStorageData,
        //   decimalDays:dayes_decimal,pagesNumber:dayes_decimal>0?correct_number*1+1:correct_number,

        // })
      }
      else {
        setPageNumber('')
      }
    },[khatmaDays])


    const handleFinishedKhatmaNum=()=>{

      let localPages=localStorage.getItem('pages_obj');
      let pages=localPages&&JSON.parse(localPages);
      console.log(pages)

      let localTime=localStorage.getItem('timeKhatma')
      let currentTime=localTime&&JSON.parse(localTime);

      if(currentTime==pages.length){
        toast.success('لقد اتممت القرائه')
        setCurrentDay([]);
        localStorage.removeItem('timeKhatma')
        localStorage.removeItem('pages_obj')
        localStorage.removeItem('quranKhatma')
        setReadenPages(0)
        setCurrentTi(1)
        return
      }
      setTimes(currentTime+1)
      setCurrentTi(currentTi+1)

      //pages


      // return
      let redPages=0;
      for(let i=0;i<times+0;i++){
        redPages+=pages[i]
      }
      setReadenPages(redPages)
      localStorage.setItem('timeKhatma',currentTime+1)

      let localShowenData=localStorage.getItem('quranKhatma');
      // setShowenData(localShowenData&&JSON.parse(localShowenData))

      let resArr=localShowenData&&JSON.parse(localShowenData);

      let currentDayLoc=resArr&&resArr.filter(it=>it.day==currentTime+1);
        // console.log(currentDayLoc[0]['ayat'])
        if(currentDayLoc&&currentDayLoc.length>0){
          setCurrentDay(currentDayLoc[0]['ayat'])
        }
    }
    const [ti,setTi]=useState()

    let localTimes=   localStorage.getItem('timeKhatma');


    useEffect(() => {
      let localTime = localStorage.getItem('timeKhatma');
      if (localTime) {
        setTi(JSON.parse(localTime)); // تعيين قيمة times
      }

      let localShowenData = localStorage.getItem('quranKhatma');
      if (localShowenData) {
        setShowenData(JSON.parse(localShowenData)); // تعيين البيانات
      }
      let localObj=localStorage.getItem('pages_obj')
      let objPages=localObj&&JSON.parse(localObj);
      if(objPages!=null){
        console.log(objPages)
        setTotalPages(objPages.length)
      }
      else {
        setTotalPages(0)
        setReadenPages(0)
      }
    }, []);


    useEffect(()=>{

      let localTime=localStorage.getItem('timeKhatma');
      setTimes(localTime&&JSON.parse(localTime))

      let localShowenData=localStorage.getItem('quranKhatma');
      // setShowenData(localShowenData&&JSON.parse(localShowenData))

      let resArr=localShowenData&&JSON.parse(localShowenData);

      if(resArr!=null){
        console.log(resArr)
        let currentDayLoc=resArr.filter(it=>it.day==times);
        // console.log(currentDayLoc[0]['ayat'])
        if(currentDayLoc.length>0){
          setCurrentDay(currentDayLoc[0]['ayat'])
        }
      }

      let localObj=localStorage.getItem('pages_obj')
      let objPages=localObj&&JSON.parse(localObj);
      console.log(objPages)
      if(objPages!=null){
        console.log(objPages)
        var readenPages=0;
        for(let i=0;i<ti;i++){
          console.log(objPages[i])
          readenPages+=objPages[i];
        }
        setReadenPages(readenPages)
      }
      else {
        setReadenPages(0)
      }
      setCurrentTi(ti)
    },[ti])





    return (
        <Box>
            <div className={showKhatma?'khatma show':'khatma'}>
              <div onClick={()=>{
                    setShowKhatma(!showKhatma)
                  }}>
                <h5>الخاتمه</h5>
                {
                  showKhatma?<IoChevronDown  />:<IoChevronUp />
                }
              </div>
              {
                true&&
                  <>
                  {console.log(currentDay,"currentDaycurrentDay")}
                    {
                      Array.isArray(currentDay)&&currentDay&&currentDay.length>0?
                      <>
                      <div className='inputs'>
                        <div>
                          {
                            <>{console.log(currentDay)}
                            {console.log(times,"times")}
                              {/**/}
                              <h5>{currentDay[0]['surah_title']} {currentDay[0]['numberInSurah']}</h5>
                              <div className="start_read">
                                ابدأ تلاوة الورد
                              </div>
                            </>
                          }
                        </div>
                        <div>
                          {
                            <>
                              {/**/}
                              <h5>{currentDay[currentDay.length-1]['surah_title']} {currentDay[currentDay.length-1]['numberInSurah']}</h5>
                              <div onClick={() => {
                                handleFinishedKhatmaNum(); // تنفيذ الوظيفة عند انتهاء القراءة
                              }} className="end_read">
                                اتممت القراءه
                              </div>
                            </>
                          }
                        </div>
                      </div>

                      {/* عرض تقدم القراءة (مثال يعرض عدد الصفحات المقروءة من أصل 604) */}
                      <div className='read_done'>
                        <h6>تمت قراءة {readenPages} من 604</h6>
                        <p>{Math.floor((readenPages / 604) * 100)}%</p>                      </div>

                      {/* عرض شريط التقدم */}
                      <div className='rank'>
                        <span
                          style={{
                            width: `${Math.floor((readenPages / 604) * 100)}%`,                            height: '100%',
                            display: 'block',
                            backgroundColor: 'red'
                          }}
                        ></span>
                      </div>

                      {/* عرض عدد الأيام المتبقية */}
                      <div>
                        {console.log(currentTi,"currentTi")}
                        {console.log(totalPages,"currentTi")}
                        <h6>عدد الأيام المتبقيه {totalPages*1-currentTi*1+1}</h6>
                      </div>

                      {/* زر لمسح البيانات */}
                      <div onClick={() => {
                        // إزالة جميع البيانات من localStorage
                        localStorage.removeItem('timeKhatma')
                        localStorage.removeItem('pages_obj')
                        localStorage.removeItem('quranKhatma')
                        setReadenPages(0)
                        setCurrentDay([])
                        setCurrentTi(1)
                      }} className='delete_icon'>
                        <FaRegTrashCan />
                        <span>مسح</span>
                      </div>
                    </>

                      :
                      <>
                          <div className='inputs'>
                        <div>
                          {
                            showFromTo?
                              <>
                                <h5>{pushedKhatmaData?.fromStr}</h5>
                                <div className="start_read">
                                  ابدأ تلاوة الورد
                                </div>
                              </>
                            :
                            <>
                                <h5>مدة الخاتمه باليوم</h5>
                              <input value={pushedKhatmaData?.khatmaDays} onChange={(e)=>{
                                setKhatmaDays(e.target.value)
                              }} type="text" placeholder='مدة الخاتمه باليوم'/>
                            </>
                          }
                        </div>
                        <div>
                          {
                            showFromTo?
                              <>
                                <h5>{pushedKhatmaData?.toStr}</h5>
                                <div className="end_read">
                                  اتممت القراءه
                                </div>
                              </>
                            :
                            <>
                              <h5>عدد الصفحات يوميا</h5>
                              <input value={pushedKhatmaData?.pagesNumber??pagesNumber} onChange={(e)=>{
                                setPageNumber(e.target.value)
                              }} type="text" placeholder='عدد الصفحات يوميا'/>
                            </>
                          }
                        </div>
                    </div>
                  {
                    pushedKhatmaData?null:
                    <div className='khatma_btn'>
                    <button
                      onClick={()=>{
                        handleMakeKhatma()
                      }}
                    >إنشاء ختمه</button>
                  </div>
                  }

                    {
                      false&&<>
                        <div className='read_done'>
                          <h6>تمت قراءة 0 من 604</h6>
                          <p>0%</p>
                        </div>
                        <div className='rank'></div>
                        <div>
                          <h6>عدد الأيام المتبقيه {days*1-times*1+1}</h6>
                        </div>
                        <div onClick={()=>{
                          localStorage.removeItem('pushLocalStorageData')
                          setHandleRemoveClick(false)
                          setShowFromTo(false)
                        }} className='delete_icon'>
                          <FaRegTrashCan />
                          <span>مسح</span>
                        </div>
                      </>
                    }

                      </>
                    }

                  </>
              }
            </div>
            <h2 style={{display:"flex",alignItems:"center" , fontSize:"27px"}}>
                <span style={{fontSize:"27px"}}>التاريخ الهجري : </span>
                <span style={{fontSize:"27px"}}>{`${year}-${month}-${day}`}</span>
            </h2>
          <PrayerTimeLine prayerTimes={prayerTimes}/>
            {/* <Container maxWidth="sm" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                border: '2px solid',
                borderColor: 'quranPlayer.main',
                borderRadius: '20px',
                gap: 1,
                pb: 3,
                pt: 1,
                backgroundColor: 'primary.contrastText',
            }}>
                <PrayerTimesHeaderRow timezone={timezone} />

                {Object.entries(prayerTimes).map(([key, value]) => {
                    return (
                        <PrayerTimesRow
                            key={uuid()}
                            prayerName={key}
                            prayerTime={value} />
                    )
                }
                )}
            </Container> */}
        </Box>
    )
}
