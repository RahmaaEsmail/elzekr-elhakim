// import adhan from "adhan";
import { Coordinates, CalculationMethod, PrayerTimes,Madhab ,Qibla} from 'adhan';
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { AdhanParamContext } from "../context/AdhanParamContext";
const usePrayerTimes = (latitude, longitude) => {
  const { madhab, calculationMethod } = useContext(AdhanParamContext);
  const calculateMethod = (method) => {
    let params = null;
    switch (method) {
      case "MuslimWorldLeague":
        params = CalculationMethod.MuslimWorldLeague();
        break;
      case "Egyptian":
        params = CalculationMethod.Egyptian();
        break;
      case "Karachi":
        params = CalculationMethod.Karachi();
        break;
      case "UmmAlQura":
        params = CalculationMethod.UmmAlQura();
        break;
      case "Dubai":
        params = CalculationMethod.Dubai();
        break;
      case "Singapor":
        params = CalculationMethod.Singapor();
        break;
      case "Turkey":
        params = CalculationMethod.Turkey();
        break;
      case "Qatar":
        params = CalculationMethod.Qatar();
        break;
      case "Kuwait":
        params = CalculationMethod.Kuwait();
        break;
      case "MoonsightingCommittee":
        params = CalculationMethod.MoonsightingCommittee();
        break;
      case "Tehran":
        params = CalculationMethod.Tehran();
        break;
      case "NorthAmerica":
        params = CalculationMethod.NorthAmerica();
        break;
      default:
        params = CalculationMethod.MuslimWorldLeague();
        break;
    }
    return params;
  };
  //today prayers
  let date = new Date();
  const coordinates = new Coordinates(latitude, longitude);
  let params = calculateMethod(calculationMethod);
  if (madhab === "Hanafi") {
    params.madhab = Madhab.Hanafi;
  } else {
    params.madhab = Madhab.Shafi;
  }
  const prayerTimes = new PrayerTimes(coordinates, date, params);
  const qiblaDirection = Qibla(coordinates);
  const c = prayerTimes.currentPrayer();
  const [current, setcurrent] = useState(c);
  const todayTimer = prayerTimes.timeForPrayer(c);
  const dhuhrTimer = prayerTimes.timeForPrayer("dhuhr");
  //Next prayer
  const n = prayerTimes.nextPrayer();
  const [next, setnext] = useState(n);
  const [nextTimer, setnextTimer] = useState(null);
  useEffect(() => {
    if (c === "sunrise") {
      setcurrent("fajr");
    } else {
      setcurrent(c);
    }
  }, [c, current]);
  //tomorrow prayers
  const tomorrow = moment().add(1, "d").toDate();
  const nextPrayerTimes = new PrayerTimes(coordinates, tomorrow, params);
  const tomorrowFajrtimer = nextPrayerTimes.timeForPrayer("fajr");
  useDeepCompareEffect(() => {
    switch (n) {
      case "fajr":
        setnext("fajr");
        setnextTimer(prayerTimes.timeForPrayer("fajr"));
        break;
      case "none":
        setnext("fajr");
        setnextTimer(tomorrowFajrtimer);
        break;
      case "sunrise":
        setnext("dhuhr");
        setnextTimer(dhuhrTimer);
        break;
      default:
        const nexttimer = prayerTimes.timeForPrayer(n);
        setnextTimer(nexttimer);
        setnext(n);
    }
  }, [n, next, todayTimer, dhuhrTimer, tomorrowFajrtimer, nextTimer]);
  return { prayerTimes, current, next, nextTimer, qiblaDirection };
};
export default usePrayerTimes;
