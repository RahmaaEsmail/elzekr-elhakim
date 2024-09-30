import React, { Fragment, useContext, useEffect, useState } from 'react'
import './prayertimeline.css'
import { GeoContext } from '../../../../context/GeoContext'
import Geo from './Geo'
import Button from "@mui/material/Button";
import PrayerTimes from './PrayerTimes'
import GeoNominatim from './GeoNominatim'
import ReactMomentCountDown from "react-moment-countdown";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import NextPrayer from './NextPrayer';
import usePrayerTimes from '../../../../hooks/usePrayerTimes';
import moment from 'moment';
const PrayerTimeLine = ({prayerTimes}) => {

  const manuallyPrayerTime = localStorage.getItem("Manually-prayerTime") ? JSON.parse(localStorage.getItem("Manually-prayerTime")) : {name:"" , time:""}
  const [times,setTimes]=useState([]);
  const [newUpdateTime , setNewUpdateTime] =useState([]);
  const [updatedTimes , setUpdatedTimes] = useState([]);
  
  const handelData=()=>{
    let pushedTime=[];
    Object.entries(prayerTimes).map(([key,value])=>{
      let obj={
        title:key,
        time : value,
        name :key=="الظهر"?"dhuhr":key=="الفجر"?"fajr":key=="العصر"?"asr":key=="المغرب"?"maghrib":"isha",
      }
      pushedTime.push(obj)
        let now = new Date();
        let currentHour = now.getHours();
        let currentMinute = now.getMinutes();
        setTimes(pushedTime)
    })
  }
  const { geoauto, geoautoError, geomanual, met } = useContext(GeoContext);
  const showgeo = JSON.parse(localStorage.getItem("GeoBigdatacloud"));
  const showGeoNominatim = JSON.parse(localStorage.getItem("GeoNominatim"));
  const [adhanNotification, setadhanNotification] = useState(false);
  const [locs,setLocs]=useState({});
  // const { next, nextTimer } = usePrayerTimes(geomanual.latitude, geomanual.longitude);
  const showAdhanNotification = () => {
    setadhanNotification(true);
  };
  const action = (
    <Fragment>
      <Button
        color="primary"
        size="small"
        onClick={(reason) => {
          if (reason === "clickaway") {
            return;
          }
          setadhanNotification(false);
        }}
      >
        Close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(reason) => {
          if (reason === "clickaway") {
            return;
          }
          setadhanNotification(false);
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );



  const getPraying=()=>{
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`Latitude: ${lat}, longitude: ${lng}`);
          setLocs({
            latitude:lat,
            longitude:lng
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }
  const { next, nextTimer } = usePrayerTimes(locs.latitude, locs.longitude);

  useEffect(()=>{
    getPraying()
  },[])

  useEffect(()=>{
    handelData()
  },[])

  // useEffect(() => {
  //   console.log(manuallyPrayerTime);
  //   if(manuallyPrayerTime) {
  //     const updatedTime = times?.map(time => 
  //       time?.title_en?.toLowerCase() == manuallyPrayerTime?.name?.toLowerCase() ? {title_en : manuallyPrayerTime?.name , value : manuallyPrayerTime?.time} : time
  //     )
  //     console.log(updatedTime)
  //     setUpdatedTimes(updatedTime);
  //   }
  // },[])

  // useEffect(() => {
  //   if(updatedTimes)
  //     setNewUpdateTime(updatedTimes);
  // } , [updatedTimes])

useEffect(() => {
  console.log(manuallyPrayerTime?.time?.split(" ")?.[0])
  if(manuallyPrayerTime) {
    const updatedData = times?.map(time => 
      time?.name?.toLowerCase() == manuallyPrayerTime?.name?.toLowerCase() ? {
        name: manuallyPrayerTime?.name,
        time:manuallyPrayerTime?.time?.split(" ")?.[0],
        title : manuallyPrayerTime?.name == "Fajr" ? "الفجر" : manuallyPrayerTime?.name == "Dhuhr" ? "الضهر" : manuallyPrayerTime?.name == "Asr" ? "العصر" : manuallyPrayerTime?.name == "Maghrib" ? "المغرب" :" العشاء"
      } : time
    )
    console.log(updatedData);
    setUpdatedTimes(updatedData);
  }
} , [times])

useEffect(() => {
  setNewUpdateTime(updatedTimes)
} , [updatedTimes])
  
  return (
    <div className='prayer_time'>
      <h5>مواقيت الصلاه</h5>
      <div className="time_lines">
        <div className="right">
          <div className='big_cir'>
            <div className="small_cir">

            </div>
          </div>
          <div className="line"></div>

          <div className='big_cir'>
            <div className="small_cir">

            </div>
          </div>
          <div className="line"></div>
          <div className='big_cir'>
            <div className="small_cir">

            </div>
          </div>
          <div className="line"></div>

          <div className='big_cir'>
            <div className="small_cir">

            </div>
          </div>
          <div className="line"></div>

          <div className='big_cir'>
            <div className="small_cir">

            </div>
          </div>
        </div>
        <div className="left">
          {
            newUpdateTime&&newUpdateTime.map((item,index)=>{
              return(
                <div className="time_line_with_line_cir">
                  <div className='cir_line'>

                      <div className='big_cir'>
                        <div className="small_cir">

                        </div>
                    </div>

                    {index!=newUpdateTime.length-1&&<div className="line"></div>}

                  </div>
                  <div className="time_line">
                    <div className="img">
                      {
                        item.name=='fajr' || item.name=='Fajr'?
                        <img src={"/images/fajr.png"} alt="" />
                        :
                        item.name=='dhuhr' || item.name=='Dhuhr'?
                        <img src={"/images/dhuhr.png"} alt="" />
                        :
                        item.name=="asr" || item?.name=="Asr"?
                        <img src={"/images/asr.png"} alt="" />
                        :
                        item.name=="maghrib" || item?.name=="Maghrib"?
                        <img src={"/images/magreb.png"} alt="" />
                        :
                        <img src={"/images/nightime.png"} alt="" />
                      }
                    </div>
                    <div className="details">
                      <h5>{index==3?'المغرب':index=='4'?'العشاء':item.title}{(next)==item.name?nextTimer!='Invalid Date'&&<ReactMomentCountDown
            toDate={moment(nextTimer).format("YYYY-MM-DD HH:mm:ss")}
            sourceFormatMask="YYYY-MM-DD HH:mm:ss"
            onCountdownEnd={() => {
              showAdhanNotification();
            }}
          />:null}</h5>
                      <p>{item.time} - {times&&times[index!=times.length-1?index+1:0].time}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* <Fragment>
      <Snackbar
        open={adhanNotification}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setadhanNotification(false);
        }}
        message="Time for prayer ..."
        action={action}
      />
      {geoautoError && (
        <div className="card center_vertical">
          <p>{geoautoError.message}</p>
        </div>
      )}
      {met === "manual" && (
        <div className="cards">
          <NextPrayer
            latitude={geomanual.latitude}
            longitude={geomanual.longitude}
            showAdhanNotification={showAdhanNotification}
          />
          {(!showgeo || showgeo === "true") && (
            <Geo
              lat={geomanual.latitude}
              lon={geomanual.longitude}
              acc={geomanual.accuracy}
              met={met}
            />
          )}
          {(!showGeoNominatim || showGeoNominatim === "true") && (
            <GeoNominatim
              lat={geomanual.latitude}
              lon={geomanual.longitude}
              acc={geomanual.accuracy}
              met={met}
            />
          )}
          <PrayerTimes lat={geomanual.latitude} lon={geomanual.longitude} />
        </div>
      )}
      {!geoautoError && (met === "auto" || met === null) && (
        <div className="cards">
          <NextPrayer
            latitude={geoauto.latitude}
            longitude={geoauto.longitude}
            showAdhanNotification={showAdhanNotification}
          />
          {(!showgeo || showgeo === "true") && (
            <Geo
              lat={geoauto.latitude}
              lon={geoauto.longitude}
              acc={geoauto.accuracy}
              met={met}
            />
          )}
          {(!showGeoNominatim || showGeoNominatim === "true") && (
            <GeoNominatim
              lat={geoauto.latitude}
              lon={geoauto.longitude}
              acc={geoauto.accuracy}
              met={met}
            />
          )}
          <PrayerTimes lat={geoauto.latitude} lon={geoauto.longitude} />
        </div>
      )}
    </Fragment> */}
    </div>
  )
}

export default PrayerTimeLine
