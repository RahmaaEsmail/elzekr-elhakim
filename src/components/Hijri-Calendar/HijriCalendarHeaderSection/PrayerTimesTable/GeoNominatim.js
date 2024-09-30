import "../../../../App.css";
import { Fragment } from "react";
import Skeleton from "@mui/material/Skeleton";
import { useAdressNominatim } from "../../../../hooks/useAdressNominatim";
export default function GeoNominatim({ lat, lon, acc, met }) {
  const api = {
    format: "json",
    base: "https://nominatim.openstreetmap.org/reverse?format=json"
  };
  const url = `${api.base}&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  const { data, error, loading } = useAdressNominatim(url);
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
            <p>Source: "Nominatim API"</p>
            <ul className="mat_list" style={{ textAlign: "left" }}>
              <li>Latitude: {lat}</li>
              <li>Longitude: {lon}</li>
              <li>Accuracy: {`More or less then ${acc} meters.`}</li>
              <li>Locality: {data.village}</li>
              <li>City: {data.town}</li>
              <li>Country: {data.country}</li>
            </ul>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
