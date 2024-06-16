import "../pages/index.css";
import { routes } from "../utils/constants.js";
import RouteItem from "../components/RouteItem.js";
import Routes from "../components/Routes.js";

const routesI = new Routes(routes, RouteItem);
routesI.populateRouteList();
routesI.populateRoute();

// google maps api
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const map = new google.maps.Map(document.querySelector("#map"), {
    zoom: 6,
    center: { lat: 28.18, lng: -81.6 },
  });

  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  document
    .getElementById("start-dropdown")
    .addEventListener("change", onChangeHandler);

  calculateAndDisplayRoute(directionsService, directionsRenderer);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService
    .route({
      origin: routesI.getVariables().start,
      destination: routesI.getVariables().end,
      waypoints: routesI.getVariables().waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

window.initMap = initMap;
