import "../../../../App.css";
import { Fragment } from "react";
import { useAdress } from "../../../../hooks/useAdress";
import Skeleton from "@mui/material/Skeleton";
export default function Geo({ lat, lon, acc, met }) {
  const api = {
    lan: "en",
    base: "https://api.bigdatacloud.net/data/reverse-geocode-client"
  };
  const url = `${api.base}?latitude=${lat}&longitude=${lon}&localityLanguage=${api.lan}`;
  const { data, error, loading } = useAdress(url);
  return (
    <Fragment>
      {error && (
        <div className="card center_vertical">
          <p>Error: {error}</p>
        </div>
      )}
      {loading && (
        <div className="card">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" />
        </div>
      )}
      {!error && data && (
        <Fragment>
          <div className="card">
            <h2>Current location ({met})</h2>
            <p>Source: "Bigdatacloud API"</p>
            <ul className="mat_list" style={{ textAlign: "left" }}>
              <li>Latitude: {lat}</li>
              <li>Longitude: {lon}</li>
              <li>Accuracy: {`More or less then ${acc} meters.`}</li>
              <li>Locality: {data.locality}</li>
              <li>City: {data.city}</li>
              <li>Country: {data.countryName}</li>
            </ul>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
