import React, { useState, useEffect, Fragment, useContext } from 'react';
import axios from 'axios';
import { Button, IconButton } from '@mui/material';
import { GeoContext } from '../../context/GeoContext'
import ReactMomentCountDown from "react-moment-countdown";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
// import NextPrayer from './NextPrayer';
import usePrayerTimes from '../../hooks/usePrayerTimes';
import './prayertime.css'
import moment from 'moment';
import Geo from '../../components/Hijri-Calendar/HijriCalendarHeaderSection/PrayerTimesTable/Geo';
import GeoNominatim from '../../components/Hijri-Calendar/HijriCalendarHeaderSection/PrayerTimesTable/GeoNominatim';
import PrayerTimes from '../../components/Hijri-Calendar/HijriCalendarHeaderSection/PrayerTimesTable/PrayerTimes';
import NextPrayer from '../../components/Hijri-Calendar/HijriCalendarHeaderSection/PrayerTimesTable/NextPrayer';
import { useAdress } from '../../hooks/useAdress';
import { ThreeDRotation } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { FaAngleDown, FaTrashCan } from 'react-icons/fa6';
import { FaAngleUp, FaTrash } from 'react-icons/fa';
import ProgressBar from "@ramonak/react-progress-bar";


const PrayerTime = ({prayerTime , locs , geomanual, setPrayerTime , newPrayerTime , setNewPrayerTime , setSelectedCity , selectedCity , setSelectedCounty , selectedCountry , currentPrayer , setCurrentPrayer , prayerTimes , setPrayerTimes , timeUntilNextPrayer , setTimeUntilNextPrayer , pageLoading ,setPageLoading , praingData , setPraingData}) => {
  const [khitmaDay , setKhitmaDay] = useState(null);
  const manualPrayerTime = localStorage.getItem("Manually-prayerTime") ? JSON.parse(localStorage.getItem("Manually-prayerTime")) : {name:"" ,time:""};
  const [khitmPagesNumber , setKhitmaPagesNumber] = useState(null);
  const language = useSelector((state) => state?.language?.language);
  // const [prayerTimes, setPrayerTimes] = useState([]);
  const [khitma , setKhitma] = useState({
    day:null,
    pageNumber:null
  });
  // const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState(null);
  // const [currentPrayer, setCurrentPrayer] = useState(null);
  // const { geoauto, geoautoError, geomanual, met } = useContext(GeoContext);
  // const [selectedCountry,setSelectedCounty]=useState('');
  const [storedCountry , setStoredCountry] = useState(localStorage.getItem("country") ? JSON.parse(localStorage.getItem("country")) : '')
  const showgeo = JSON.parse(localStorage.getItem("GeoBigdatacloud"));
  const showGeoNominatim = JSON.parse(localStorage.getItem("GeoNominatim"));
  const [adhanNotification, setadhanNotification] = useState(false);
  const [isOpenKhitma , setIsOpenKhitma] = useState(false);
  const [createKhitma , setCreateKhitma] = useState(false)
  const [countires,setCountries]=useState([])
  const [contry,setCountry]=useState();
  // const [locs,setLocs]=useState({})
  const [cities,setCities]=useState([]);
  // const [praingData,setPraingData]=useState([]);
  // const [selectedCity,setSelectedCity]=useState('');
  // const [pageLoading,setPageLoading]=useState(false);
  const [updated, setUpdated]=useState(false);
  const [updatedPrayerTimes  , setUpdatePrayerTimes] = useState([]);
  const { next, nextTimer } = usePrayerTimes(locs.latitude, locs.longitude);
  // const [newPrayerTime , setNewPrayerTime] = useState([]);

  // const api = {
  //   lan: "en",
  //   base: "https://api.bigdatacloud.net/data/reverse-geocode-client"
  // };
  // const url = `${api.base}?latitude=${geoauto.lat}&longitude=${geoauto.lon}&localityLanguage=${api.lan}`;
  // const { data, error, loading } = useAdress(url);

  // const getPraying=()=>{
  //   if('geolocation' in navigator){
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude;
  //         const lng = position.coords.longitude;
  //         console.log(`Latitude: ${lat}, longitude: ${lng}`);
  //         setLocs({
  //           latitude:lat,
  //           longitude:lng
  //         });
  //       },
  //       (error) => {
  //         console.error("Error getting user location:", error);
  //       }
  //     );
  //   }
  // }
  // useEffect(()=>{
  //   getPraying()
  // },[])


  // useEffect(() => {
  //   const fetchPrayerTimes = async () => {
  //     try {
  //       const response = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
  //         params: {
  //           city: 'tanta',
  //           country: 'egypt',
  //           method: '2',
  //         },
  //       });
  //       const timings = response.data.data.timings;
  //       const prayerKeys = Object.keys(timings);
  //       const currentTime = new Date();
  //       const updatedPrayerTimes = prayerKeys.map(key => {
  //         const prayerTime = new Date(`${timings[key]} ${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`);
  //         const timeDifference = prayerTime - currentTime;
  //         return {
  //           name: key,
  //           time: timings[key],
  //           isCurrentPrayer: timeDifference <= 0,
  //           timeUntilPrayer: Math.floor(timeDifference / (1000 * 60)),
  //         };
  //       });
  //       setPrayerTimes(updatedPrayerTimes);

  //       const nextPrayer = updatedPrayerTimes.find(prayer => !prayer.isCurrentPrayer);
  //       if (nextPrayer) {
  //         setTimeUntilNextPrayer(nextPrayer.timeUntilPrayer);
  //         setCurrentPrayer(nextPrayer.name);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching prayer times:', error);
  //     }
  //   };

  //   fetchPrayerTimes();
  // }, []);

  useEffect(() => {
    console.log(prayerTimes)
  } , [prayerTimes])

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

//   const getPrayTimes=async()=>{
//     setPageLoading(true)
//     // إنشاء كائن Date للتاريخ الحالي
// var today = new Date();

// // الحصول على اليوم والشهر والسنة
// var day = today.getDate();
// var month = today.getMonth() + 1; // يتم تعيين الشهر من 0 إلى 11، لذا يجب إضافة 1
// var year = today.getFullYear();

// // تنسيق اليوم والشهر ليكونوا في الصيغة المطلوبة "dd-mm-yyyy"
// if (day < 10) {
//     day = '0' + day;
// }
// if (month < 10) {
//     month = '0' + month;
// }

// // بناء التاريخ بالصيغة المطلوبة
// var formatted_date = day + '-' + month + '-' + year;


//     await axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${selectedCity}&country=${selectedCountry}&method=3&date=${formatted_date}`)
//     .then((res)=>{
//       // console.log(res.data.data[0].date.gregorian.date)

//       if(res.data.status=='OK'){
//         // console.log(res.data.data)
//         // setPraingData(res.data.data);
//         let allDates=[...res.data.data];
//       for(let i=0;i<allDates.length;i++){
//         if(allDates[i].date.gregorian.date==formatted_date){
//           // console.log('yes')
//           // setPraingData(allDates[i])
//           // console.log()
//           let pushedData=[]
//           console.log(allDates[i].timings)
//           Object.entries(allDates[i].timings).map(([key,value])=>{
//             console.log(key)
//             let obj={
//               name:key,
//               time:value
//             }
//             pushedData.push(obj);
//             console.log(obj)
//           })
//           setPraingData(pushedData)
//         }
//       }
//       }
//     }).catch(e=>{
//       console.log(e)
//     })
//     .finally(()=>{
//       setPageLoading(false)
//     })
//   }
  useEffect(()=> {
    console.log(praingData)
  },[praingData])

  const getOurCountires=async()=>{
    await axios.get(`https://restcountries.com/v3.1/all`)
    .then((res)=>{
      // console.log(res)
      // console.log(res.data[0].translations?.ara?.official)
      const sortedCountries = res.data.sort((a, b) => {
        // Sort alphabetically by country name
        // console.log(b.name.translations?.ara?.official)
        return a.translations?.ara?.official.localeCompare(b.translations?.ara?.official);
      });
      setCountries(sortedCountries)
      console.log(sortedCountries)
      setSelectedCounty(sortedCountries[0]&&sortedCountries[0].cca2)
    }).catch(e=>console.log(e))
  }
  const getCities=async()=>{
    await axios.get(`http://api.geonames.org/searchJSON?username=prayer&country=${selectedCountry}&lang=${language}`)
    .then((res)=>{
      if(res.data.status=='OK'){
      }
      setCities(res.data.geonames);
      setSelectedCity(res.data.geonames[0].toponymName);
    }).catch(e=>{
      console.log(e)
    })
  }

  useEffect(() => {
    if (storedCountry && selectedCountry && storedCountry !== selectedCountry) {
      localStorage.removeItem("Manually-prayerTime");
      localStorage.setItem("country", JSON.stringify(selectedCountry));
      setStoredCountry(selectedCountry);
    }
  }, [selectedCountry, storedCountry]);

  useEffect(() => {
    localStorage.setItem("country" , JSON.stringify(selectedCountry))
  } , [selectedCountry])

  useEffect(()=>{
    getCities()
  },[selectedCountry,language])
  useEffect(()=>{
    // getCountries()
    getOurCountires()
  },[])
  // useEffect(()=>{
  //   getPrayTimes()
  // },[selectedCity,selectedCountry])
   
  function handleChangeKhitmDay(e) {
    setKhitmaDay(e.target.value);
    setKhitmaPagesNumber(Math.ceil(604 / Number(e.target.value)))
  }

  function handleChangeKhitmaPageNumber(e) {
    setKhitmaPagesNumber(e.target.value);
    setKhitmaDay(Math.ceil(604 / Number(e.target.value)))
  }

  function handleCreateKhitma() {
    if(khitmPagesNumber && khitmaDay) {
      setCreateKhitma(true);
      return;
    }
    setCreateKhitma(false);
  }

    useEffect(()=>{
      const updatedPrayerTimes = praingData.map(item => {
      
        const time = item.time.split(' ')[0]; // فصل الوقت عن (GMT)
        let [hours, minutes] = time.split(':').map(Number);
  
        hours += Number(prayerTime);
        if (hours < 0) hours += 24; // للتأكد أن الساعات لا تقل عن 0
        hours = hours % 24; 
  
        const newTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} (GMT)`;
        console.log(newTime)
        return { ...item, time: newTime };
      }) 
      console.log(updatedPrayerTimes);
      setNewPrayerTime(updatedPrayerTimes);
    },[praingData]);
  
  useEffect(() => {
    const manualPrayerTime = localStorage.getItem("Manually-prayerTime") ? JSON.parse(localStorage.getItem("Manually-prayerTime")) : {name:"" ,time:""};
    console.log(manualPrayerTime);
      
    if (manualPrayerTime) {
      const updatedPrayerTimes = newPrayerTime.map(prayer => 
        prayer.name === manualPrayerTime.name ? manualPrayerTime : prayer
      );
      setUpdated(updatedPrayerTimes);  // Update the state with the new prayer times
    }
  }, [newPrayerTime]);

    useEffect(()=>{
      if(updated)
        setUpdatePrayerTimes(updated);
    },[updated])

  useEffect(() => {
    console.log(selectedCountry);
  } , [selectedCountry])

  return (
    <div className='prayer_time'>
      <h2> الصلاة القادمه </h2>
      <NextPrayer
        latitude={geomanual.latitude}
        longitude={geomanual.longitude}
        showAdhanNotification={showAdhanNotification}
      />
      <div className="countries_praiers">
        <h4>مواقيت الصلاه</h4>
        <div className="content">
          <select
            value={selectedCountry}
            onChange={(e)=>{
              setSelectedCounty(e.target.value);
            
            }}
          >
            {
              countires.map((item,index)=>{
                return <option value={item.cca2}>{language=='ar'?item?.translations?.ara?.official:item?.translations?.bre?.official}</option>
              })
            }
          </select>
          <select
            onChange={(e)=>{
              setSelectedCity(e.target.value)
            }}
            value={selectedCity}
          >
            {
              cities.map((item,index)=>{
                return (
                  <option value={item.toponymName}>{item.adminName1}</option>
                )
              })
            }
          </select>
          <div className='prays'>
            {
              pageLoading?
              (
                <ThreeDRotation/>
              )
              :
              (
                updatedPrayerTimes&&updatedPrayerTimes.map((item,index)=>{
                  return(
                    <div className='one_pray'>
                      <h4>{item.name=='Dhuhr'?'الظهر':item.name=='Asr'?'العصر':item.name=='Maghrib'?'المغرب':item.name=='Sunset'?'الغروب':item.name=='Isha'?'العشاء':item.name=='Imsak'?'الإمساك':item.name=='Midnight'?'منتصف الليل':item.name=='Firstthird'?'الثلث الأول':item.name=='Lastthird'?'الثلث الأخير':item.name=='Sunrise'?'الشروق':'الفجر'}</h4>
                      <p>{item.time}</p>
                    </div>
                  )
                })
              )
            }
          </div>
        </div>
      </div>


    </div>
  );
};

export default PrayerTime;
