import Moment from "react-moment";
import "moment-timezone";
import "../../../../App.css";
import logo from "../assets/logo.svg";
import usePrayerTimes from "../../../../hooks/usePrayerTimes";
export default function PrayerTimes(props) {
  const { prayerTimes, current, qiblaDirection } = usePrayerTimes(
    props.lat,
    props.lon
  );
  return (
    <div className="card">
      <img src={logo} alt="logo" />
      <h2>Prayer times</h2>
      <p>Source: "AdhanJS"</p>
      <ul className="mat_list" style={{ textAlign: "left" }}>
        <li>Qibla: {qiblaDirection}</li>
        <li>current : {current}</li>

        <li>
          fajr:
          <Moment format="HH:mm">{prayerTimes.fajr}</Moment>
        </li>
        <li>
          dhuhr:
          <Moment format="HH:mm">{prayerTimes.dhuhr}</Moment>
        </li>
        <li>
          asr:
          <Moment format="HH:mm">{prayerTimes.asr}</Moment>
        </li>
        <li>
          maghrib:
          <Moment format="HH:mm">{prayerTimes.maghrib}</Moment>
        </li>
        <li>
          isha:
          <Moment format="HH:mm">{prayerTimes.isha}</Moment>
        </li>
      </ul>
    </div>
  );
}
