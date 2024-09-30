import Moment from "react-moment";
import usePrayerTimes from "../../../../hooks/usePrayerTimes";
import SoundWrapper from "./SoundWrapper";
import './nextprayer.css'
import "../../../../App.css";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import moment from "moment";
import axios from "axios";
import { useState,useEffect } from "react";
import NextJammahTime from "./NextJamaa";
export default function NextPrayer({
  latitude,
  longitude,
  showAdhanNotification
}) {
  const [lan] = useLocalStorage("Language", "English");
  const [locs,setLocs]=useState({});
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
  useEffect(()=>{
    getPraying()
  },[])

  //prayertimes
  const { next, nextTimer } = usePrayerTimes(locs.latitude, locs.longitude);
  if (!nextTimer) {
    return <p>Error loading Next prayer timer</p>;
  }



  return (
    <div className="card">
      <div className="img">
        <img src="/images/prayer.jpg" alt="" />
      </div>
      <div className="details">
        <h2>الصلاه القادمه</h2>
        <ul className="mat_list" style={{ textAlign: "center" }}>
          <li style={{marginTop:'20px'}}>
            {/* {console.log(next)} */}
            <strong>{
                // next=='dhuhr'?'العصر':next=='asr'?'المغرب':next=='fajr'?'الظهر':next=='maghrib'?'العشاء':'الفجر'
                // next=='dhuhr'?'الظهر':next=='Asr'?'العصر':next=='fajr'?'الفجر':next=='maghrib'?'المغرب':'العشاء'
              }<NextJammahTime/> </strong>
              {/* ({nextTimer!='Invalid Date'&&<Moment format="HH:mm">{nextTimer}</Moment>}) */}
          </li>
          <li>
            <SoundWrapper
              timer={nextTimer}
              showAdhanNotification={showAdhanNotification}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
