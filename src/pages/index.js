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

//

// fetch(
//   "https://api.geoapify.com/v1/routing?waypoints=25.788158,-80.129423|26.783238,-80.041613|27.311745,-82.576569&mode=drive&apiKey=12e0d4245d144d2e86f962a7a272fca8"
// )
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 41.85, lng: -87.65 },
  });

  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const miami = new google.maps.LatLng(25.788158, -80.129423);
  const philFoster = new google.maps.LatLng(26.783238, -80.041613);
  const lido = new google.maps.LatLng(27.311745, -82.576569);
  directionsService
    .route({
      origin: miami,
      destination: lido,
      waypoints: [
        {
          location: philFoster,
        },
      ],
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

window.initMap = initMap;
