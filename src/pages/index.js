import "../pages/index.css";
import beaches from "../utils/beaches.json";
import ListItem from "../components/ListItem.js";

const beachesSplit = beaches.map((beach) => {
  const split = beach.coordinates.split(", ");
  return {
    name: beach.NAME,
    location: { lat: parseFloat(split[0]), lng: parseFloat(split[1]) },
  };
});

let startingBeach = beachesSplit[0].location;
let endingBeach = beachesSplit[1].location;
let waypoints = [];
let waypointCounter = 0;

function registerWaypoints() {
  waypoints = beachesSplit
    .filter(
      (beach) =>
        beach.location !== startingBeach && beach.location !== endingBeach
    )
    .map((beach) => {
      return {
        location: beach.location,
      };
    });
  console.log(waypoints);
}

registerWaypoints();

function populateDropdownLists() {
  const startContainer = document.querySelector("#start-dropdown");
  const endContainer = document.querySelector("#end-dropdown");
  const listCreator = new ListItem("#start-list");
  beaches.forEach((beach) => {
    startContainer.append(listCreator.generateListItem(beach));
    endContainer.append(listCreator.generateListItem(beach));
  });
  endContainer.selectedIndex = 1;

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
  endContainer.addEventListener("change", () => {
    const currentIndexName =
      endContainer[endContainer.selectedIndex].textContent;
    const matchingBeach = beachesSplit.find(
      (beach) => beach.name === currentIndexName
    );
    endingBeach = matchingBeach.location;
    console.log(endingBeach);
    registerWaypoints();
  });
}
populateDropdownLists();

// google maps api
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const map = new google.maps.Map(document.getElementById("map"), {
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
  document
    .getElementById("end-dropdown")
    .addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService
    .route({
      origin: startingBeach,
      destination: endingBeach,

      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

window.initMap = initMap;
