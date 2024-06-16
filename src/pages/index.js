import "../pages/index.css";
import beaches from "../utils/beachesv2.json";
import ListItem from "../components/ListItem.js";
import RouteItem from "../components/RouteItem.js";

const beachCoords = beaches.coordinates.map((beach) => {
  return {
    location: { lat: beach[0], lng: beach[1] },
  };
});

let startingBeach = beachCoords[0].location;
let endingBeach = beachCoords[beachCoords.length - 1].location;
let waypoints = [];

function registerWaypoints() {
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

registerWaypoints();

function populateDropdownLists() {
  const startContainer = document.querySelector("#start-dropdown");
  const listCreator = new ListItem("#start-list");
  //   beachCoords.forEach((beach) => {
  //     startContainer.append(listCreator.generateListItem(beach));
  //   });
  startContainer.append(
    listCreator.returnOption(beaches.optimal_route_sequence)
  );

  startContainer.addEventListener("change", () => {
    const currentIndexName =
      startContainer[startContainer.selectedIndex].textContent;
    const matchingBeach = beachesSplit.find(
      (beach) => beach.name === currentIndexName
    );
    startingBeach = matchingBeach.location;
    console.log(startingBeach);
    registerWaypoints();
  });
}
populateDropdownLists();

function populateRoutes() {
  const routeList = document.querySelector(".routes__list");
  const routeCreator = new RouteItem("#routes");
  let routeCounter = 0x0041; //start lettering at A
  beaches.optimal_route_sequence.forEach((route) => {
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
