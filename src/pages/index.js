import "../pages/index.css";
import data from "../utils/data.json";
import ListItem from "../components/ListItem.js";

let startingBeach = data.beaches[0].address;
let endingBeach = data.beaches[1].address;

function populateDropdownLists() {
  const startContainer = document.querySelector("#start-dropdown");
  const endContainer = document.querySelector("#end-dropdown");
  const listCreator = new ListItem("#start-list");
  data.beaches.forEach((beach) => {
    startContainer.append(listCreator.generateListItem(beach));
    endContainer.append(listCreator.generateListItem(beach));
  });

  startContainer.addEventListener("change", () => {
    const listIndex = startContainer.selectedIndex;
    startingBeach = startContainer[listIndex].textContent;
  });
  endContainer.addEventListener("change", () => {
    const listIndex = endContainer.selectedIndex;
    endingBeach = endContainer[listIndex].textContent;
  });
}
populateDropdownLists();

// google maps api
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
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

window.initMap = initMap;
