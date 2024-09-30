import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import './App.css';
import CommonFooter from './components/CommonFooter';
import CommonNavbar from './components/CommonNavbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import SpinnerLoading from './components/SpinnerLoading';
import NotFound from './components/NotFound';
import Header from './components/Header/Header';
import ElectronicRosary from './pages/ElectronicRosary/ElectronicRosary';
import PrayerTime from './pages/PrayerTime/PrayerTime';
import Footer from './components/Footer/Footer';
import HajOmra from './pages/HajOmra/HajOmra';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/SignUp/Login';
import Azkar from './pages/Azkar/Azkar';
import Prayers from './pages/Prayers/Prayers';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
// import { ToastContainer } from 'react-bootstrap';
import Roquia from './pages/Roquia/Roquia';
import Library from './pages/Library/Library';
import Notes from './pages/Notes/Notes';
// import "./style.css";
import "react-quill/dist/quill.snow.css";
import Hadith from './pages/Hadith/Hadith';
import Litanies from './pages/Litanies/Litanies';
import Questions from './pages/Questions/Questions';
import { ToastContainer, toast } from 'react-toastify';
import { fetchInfoData } from './store/userinfo';
import { useDispatch } from 'react-redux';
import MyBooks from './pages/MyBooks/MyBooks';
import NextJammahTime from './components/Hijri-Calendar/HijriCalendarHeaderSection/PrayerTimesTable/NextJamaa';
import SendCode from './pages/SendCode/SendCode';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import UpdatePass from './pages/UpdatePass/UpdatePass';
import Profile from './pages/Profile/Profile';
import RoquiaDetails from './pages/RoquiaDetails/RoquiaDetails';
import LitanyDetails from './pages/LitanyDetails/LitanyDetails';
import axios from 'axios';
import { BASE_URL } from './constants';
import HadithDetails from './pages/HadithDetails/HadithDetails';
import Quran2 from './pages/Quran2/Quran2';
import ReadCom from './pages/Quran2/ReadCom';
import Settings from './pages/Settings/Settings';
import { GeoContext } from './context/GeoContext';
import { useAdress } from './hooks/useAdress';
// import { Login } from '@mui/icons-material';

const AdhkarPage = lazy(() => import('./pages/AdhkarPage'));
const HijriCalendarPage = lazy(() => import('./pages/HijriCalendarPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const QuranPage = lazy(() => import('./pages/QuranPage'));
const HijriCalendarByDatePage = lazy(() => import('./pages/HijriCalendarByDatePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#015792',
      light: '#fff3ea',
      contrastText: '#fff',
    },
    quranPlayer: {
      main: '#42a1c2',
      light: '#e5e5e5',
      contrastText: '#fff',
    },
  },
});

function App() { 
  const [higriDate , setHigriDate] = useState(localStorage.getItem("higri_date") ? JSON.parse(localStorage.getItem("higri_date")) : 0);
  const [prayerTime , setPrayerTime] = useState(localStorage.getItem("prayer_time") ? JSON.parse(localStorage.getItem("prayer_time")) : 0);
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("font_size")
      ? JSON.parse(localStorage.getItem("font_size"))
      : {
          headerSize: "16",
          quraanSize: "16",
        }
  );
  const [manualPrayerTime , setManualPrayerTime] = useState(localStorage.getItem("Manually-prayerTime") ? JSON.parse(localStorage.getItem("Manually-prayerTime")) : {
    name:"",
    time : ""
  })
  const [newPrayerTime , setNewPrayerTime] = useState([]);
  
  let localSize=localStorage.getItem('font_size_elzeker');
  let sizeData=localSize&&JSON.parse(localSize)
  const [azkars,setAzkars]=useState([]);
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
       .app * {
         font-size: ${sizeData}px !important;
       }
     </style>`
  );
  const { geoauto, geoautoError, geomanual, met } = useContext(GeoContext);
  const [locs,setLocs]=useState({})

  const api = {
    lan: "en",
    base: "https://api.bigdatacloud.net/data/reverse-geocode-client"
  };
  const url = `${api.base}?latitude=${geoauto.lat}&longitude=${geoauto.lon}&localityLanguage=${api.lan}`;
  const { data, error, loading } = useAdress(url);
  const [praingData,setPraingData]=useState([]);
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [selectedCity,setSelectedCity]=useState('');
  const [selectedCountry,setSelectedCounty]=useState('');
  const [pageLoading ,setPageLoading]= useState(false);

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

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
          params: {
            city: 'tanta',
            country: 'egypt',
            method: '2',
          },
        });
        const timings = response.data.data.timings;
        const prayerKeys = Object.keys(timings);
        const currentTime = new Date();
        const updatedPrayerTimes = prayerKeys.map(key => {
          const prayerTime = new Date(`${timings[key]} ${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`);
          const timeDifference = prayerTime - currentTime;
          return {
            name: key,
            time: timings[key],
            isCurrentPrayer: timeDifference <= 0,
            timeUntilPrayer: Math.floor(timeDifference / (1000 * 60)),
          };
        });
        setPrayerTimes(updatedPrayerTimes);

        const nextPrayer = updatedPrayerTimes.find(prayer => !prayer.isCurrentPrayer);
        if (nextPrayer) {
          setTimeUntilNextPrayer(nextPrayer.timeUntilPrayer);
          setCurrentPrayer(nextPrayer.name);
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    fetchPrayerTimes();
  }, []);


  const getPrayTimes=async()=>{
    setPageLoading(true)
    // إنشاء كائن Date للتاريخ الحالي
var today = new Date();

// الحصول على اليوم والشهر والسنة
var day = today.getDate();
var month = today.getMonth() + 1; // يتم تعيين الشهر من 0 إلى 11، لذا يجب إضافة 1
var year = today.getFullYear();

// تنسيق اليوم والشهر ليكونوا في الصيغة المطلوبة "dd-mm-yyyy"
if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = '0' + month;
}

// بناء التاريخ بالصيغة المطلوبة
var formatted_date = day + '-' + month + '-' + year;


    await axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${selectedCity}&country=${selectedCountry}&method=3&date=${formatted_date}`)
    .then((res)=>{
      // console.log(res.data.data[0].date.gregorian.date)

      if(res.data.status=='OK'){
        // console.log(res.data.data)
        // setPraingData(res.data.data);
        let allDates=[...res.data.data];
      for(let i=0;i<allDates.length;i++){
        if(allDates[i].date.gregorian.date==formatted_date){
          // console.log('yes')
          // setPraingData(allDates[i])
          // console.log()
          let pushedData=[]
          console.log(allDates[i].timings)
          Object.entries(allDates[i].timings).map(([key,value])=>{
            console.log(key)
            let obj={
              name:key,
              time:value
            }
            pushedData.push(obj);
            console.log(obj)
          })
          setPraingData(pushedData)
        }
      }
      }
    }).catch(e=>{
      console.log(e)
    })
    .finally(()=>{
      setPageLoading(false)
    })
  }
  
  useEffect(()=>{
    getPrayTimes()
  },[selectedCity,selectedCountry])

  useEffect(() => {
    console.log(newPrayerTime)
  } , [newPrayerTime])

  useEffect(() => {
    localStorage.setItem("higri_date" , JSON.stringify(higriDate));
} , [higriDate])

useEffect(() => {
  localStorage.setItem("prayer_time",JSON.stringify(prayerTime))
} , [prayerTime])


useEffect(() => {
  localStorage.setItem("font_size" , JSON.stringify(fontSize))
}, [fontSize])
  const getAzkars=()=>{
    axios.get(BASE_URL+`azkars/get_for_user`)
    .then((res)=>{
      if(Array.isArray(res.data.result)){
        setAzkars(res.data.result)
      }
    })
    .catch(e=>console.log(e))
  }

  useEffect(()=>{

    document.head.insertAdjacentHTML(
      "beforeend",
      `<style>:.app *{font-size:${100}px !important}</style>`
    );
    getAzkars()
  },[])

  // setTimeout(() => {
  //   toast.success(azkars[Math.floor(Math.random(azkars.length)*azkars.length)].content);
  //   // console.log(azkars[2].content)
  // }, 2000);
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchInfoData())
  },[])
  useEffect(() => {
    const interval = setInterval(() => {
      toast.success(azkars[Math.floor(Math.random(azkars?.length)*azkars?.length)]?.content);
    }, 300000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Box sx={{
            '*::selection': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
            }
          }}>
            {/* <CommonNavbar /> */}
            <Header fontSize={fontSize}/>
            <Suspense fallback={
              <div style={{
                minHeight:'80vh'
              }}>
                <SpinnerLoading />
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quran" element={<QuranPage fontSize={fontSize}/>} />
                <Route path="/quran2" element={<Quran2 />} />
                <Route path="/settings" element={<Settings setNewPrayerTime={setNewPrayerTime} newPrayerTime={newPrayerTime} manualPrayerTime={manualPrayerTime} setManualPrayerTime={setManualPrayerTime} setFontSize={setFontSize} fontSize={fontSize} prayerTime={prayerTime} setPrayerTime={setPrayerTime} higriDate={higriDate} setHigriDate={setHigriDate}/>}/>
                <Route path="/readcom/:id" element={<ReadCom />} />
                <Route path="/litanies" element={<Litanies />} />
                <Route path="/litany/:id" element={<LitanyDetails />} />
                <Route path="/roquia_details/:id" element={<RoquiaDetails />} />
                <Route path="/haj_omra" element={<HajOmra />} />
                <Route path="/hadith_details/:id" element={<HadithDetails />} />
                <Route path="/hadith" element={<Hadith />} />
                <Route path="/library" element={<Library />} />
                {/* <Route path="/prayers" element={<Prayers />}/> */}
                <Route path="/notes" element={<Notes />} />
                <Route path="/my_books" element={<MyBooks />} />
                <Route path="/azkar" element={<Azkar />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/roquia" element={<Roquia />} />
                <Route path="/hijri-calendar"  element={<HijriCalendarPage higriDate={higriDate} setHigriDate={setHigriDate} />} />
                <Route path="/hijri-calendar/:date" element={<HijriCalendarByDatePage />} />
                <Route path="/adhkar" element={<AdhkarPage />} />
                <Route path="/prayer_time" element={<PrayerTime locs={locs} geomanual={geomanual} setSelectedCity={setSelectedCity} selectedCity={selectedCity} setSelectedCounty={setSelectedCounty}  selectedCountry={selectedCountry} currentPrayer={currentPrayer} setCurrentPrayer={setCurrentPrayer} prayerTimes={prayerTimes} setPrayerTimes={setPrayerTimes} timeUntilNextPrayer={timeUntilNextPrayer} setTimeUntilNextPrayer={setTimeUntilNextPrayer} pageLoading={pageLoading} setPageLoading={setPageLoading} praingData={praingData} setPraingData={setPraingData}  manualPrayerTime={manualPrayerTime} newPrayerTime={newPrayerTime} setNewPrayerTime={setNewPrayerTime}  prayerTime={prayerTime} setPrayerTime={setPrayerTime}/>} />
                <Route path="/send_code" element={<SendCode />} />
                <Route path="/change_password" element={<ChangePassword />} />
                <Route path="/update_password" element={<UpdatePass />} />
                {/* <Route path="/NextJammahTime" element={<NextJammahTime />} /> */}
                <Route path="/sign_up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/about" element={<AboutPage />} /> */}
                <Route path='/electronic_rosary' element={<ElectronicRosary/>}/>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            {/* <CommonFooter /> */}
          </Box>
          <Footer/>
          <ToastContainer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
