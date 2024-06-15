import "../pages/index.css";
import data from "../utils/data.json";

const lat1 = data.beaches[2].latitude;
const long1 = data.beaches[2].longitude;
const lat2 = data.beaches[1].latitude;
const long2 = data.beaches[1].longitude;

function haversine(lat1, lon1, lat2, lon2) {
  // Convert latitude and longitude from degrees to radians
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  // Differences in coordinates
  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  // Haversine formula
  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);

  const c = 2 * Math.asin(Math.sqrt(a));
  const r = 3956; // Radius of Earth in miles

  const distance = c * r;
  return `${Math.floor(distance)} miles`;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

console.log(haversine(lat1, long1, lat2, long2));
