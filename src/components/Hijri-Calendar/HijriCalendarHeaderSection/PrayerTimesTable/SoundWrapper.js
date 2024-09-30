import { useEffect, useState } from "react";
import soundfile from "../assets/first_adhan_masjid_aadam.ogg";
import ReactMomentCountDown from "react-moment-countdown";
import moment from "moment";
import usePrayerTimes from "../../../../hooks/usePrayerTimes";
export default function SoundWrapper({ timer, showAdhanNotification }) {
  const [playing, setplaying] = useState(false);
  const [paused, setpaused] = useState(false);
  const [locs,setLocs]=useState({});
  const [audio] = useState(new Audio(soundfile));
  const formatedTimer = moment(timer).format("YYYY-MM-DD HH:mm:ss");

  // const { next, nextTimer } = usePrayerTimes(locs.latitude, locs.longitude);
  const { next, nextTimer } = usePrayerTimes(locs.latitude, locs.longitude);
  // console.log(nextTimer)
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
    try {
    false ? audio.play() : audio.pause();

    } catch (error) {

    }
  }, [playing, audio]);
  useEffect(() => {
    audio.addEventListener("ended", () => setplaying(false));
    return () => {
      audio.removeEventListener("ended", () => setplaying(false));
    };
  }, [audio]);

  return (
    <div>
      {!playing && (
        <div>
          {
            nextTimer=='Invalid Date'?
            (
              null
            )
            :
            (
              <>
                بعد:{" "}
          <ReactMomentCountDown
            toDate={moment(nextTimer).format("YYYY-MM-DD HH:mm:ss")}
            sourceFormatMask="YYYY-MM-DD HH:mm:ss"
            onCountdownEnd={() => {
              if (paused) {
                return null;
              }
              setplaying(true);
              showAdhanNotification();
            }}
          />
              </>
            )
          }
        </div>
      )}
      {playing && (
        <div>
          <p>الأذان الأن</p>
          <button
            onClick={() => {
              if (paused) {
                return null;
              }
              setpaused(true);
              setplaying(false);
            }}
          >
            توقف
          </button>
        </div>
      )}
    </div>
  );
}
