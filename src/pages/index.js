import "../pages/index.css";
import { routes } from "../utils/constants.js";
import hannaPark from "../routes/hanna-park.json";
import ListItem from "../components/ListItem.js";
import RouteItem from "../components/RouteItem.js";

console.log(routes);

// const beachCoords = hannaPark.coordinates.map((beach) => {
//   return {
//     location: { lat: beach[0], lng: beach[1] },
//   };
// });

let startingBeach = [];
let endingBeach = [];
let waypoints = [];
let currentDropdownIndex = 0;

function registerWaypoints(beachCoords) {
  waypoints = beachCoords
    .filter(
      (beach) =>
        beach.location !== startingBeach && beach.location !== endingBeach
    )
    .map((beach) => {
      return {
        location: beach.location,
      };
    });
}
// registerWaypoints();

function populateRoute() {
  const startContainer = document.querySelector("#start-dropdown");
  getCurrentRoute(startContainer);

  startContainer.addEventListener("change", () => {
    getCurrentRoute(startContainer);
    populateRoutes();
  });
}
populateRoute();

function getCurrentRoute(startContainer) {
  currentDropdownIndex = startContainer.selectedIndex;
  const beachCoords = routes[0][currentDropdownIndex].coordinates.map(
    (beach) => {
      return {
        location: { lat: beach[0], lng: beach[1] },
      };
    }
  );
  startingBeach = beachCoords[0].location;
  endingBeach = beachCoords[beachCoords.length - 1].location;
  registerWaypoints(beachCoords);
}

function populateRoutes() {
  const routeList = document.querySelector(".routes__list");
  while (routeList.querySelector(".routes__list-item")) {
    routeList.removeChild(routeList.querySelector(".routes__list-item"));
  }
  const routeCreator = new RouteItem("#routes");
  let routeCounter = 0x0041; //start lettering at A
  routes[0][currentDropdownIndex].optimal_route_sequence.forEach((route) => {
    const uniChar = String.fromCharCode(routeCounter);
    routeList.append(routeCreator.generateRouteItem(route, uniChar));
    routeCounter++;
  });
}
populateRoutes();

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
      origin: startingBeach,
      destination: endingBeach,
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

window.initMap = initMap;
