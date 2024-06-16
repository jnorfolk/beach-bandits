export default class Routes {
  constructor(routes, RouteItem) {
    this._routes = routes;
    this._routeItem = RouteItem;
    this._dropdownIndex = 0;
    this._startingBeach = [];
    this._endingBeach = [];
    this._waypoints = [];
  }

  populateRouteList() {
    const routeList = document.querySelector(".routes__list");
    const routeCreator = new this._routeItem("#routes");
    const routeNames =
      this._routes[0][this._dropdownIndex].optimal_route_sequence;
    while (routeList.querySelector(".routes__list-item")) {
      routeList.removeChild(routeList.querySelector(".routes__list-item"));
    } //clear old routes
    let routeCounter = 0x0041; //start lettering at A
    routeNames.forEach((routeName) => {
      const uniChar = String.fromCharCode(routeCounter); //convert char code to unicode
      routeList.append(routeCreator.generateRouteItem(routeName, uniChar));
      routeCounter++;
    });
  }

  populateRoute() {
    const startDropdownEl = document.querySelector("#start-dropdown");
    this.updateActiveRoute(startDropdownEl);

    startDropdownEl.addEventListener("change", () => {
      this.updateActiveRoute(startDropdownEl);
      this.populateRouteList();
    });
  }

  updateActiveRoute(startDropdownEl) {
    this._dropdownIndex = startDropdownEl.selectedIndex;
    const beachCoords = this._routes[0][this._dropdownIndex].coordinates.map(
      (beach) => {
        return {
          location: { lat: beach[0], lng: beach[1] }, //this format is needed for the Google Maps API
        };
      }
    );
    this._startingBeach = beachCoords[0].location;
    this._endingBeach = beachCoords[beachCoords.length - 1].location;
    this.registerWaypoints(beachCoords);
  }

  registerWaypoints(beachCoords) {
    this._waypoints = beachCoords
      .filter(
        (beach) =>
          beach.location !== this._startingBeach &&
          beach.location !== this._endingBeach //waypoints include all coordinates except for the starting and ending locations
      )
      .map((beach) => {
        return {
          location: beach.location,
        };
      });
  }

  getVariables() {
    return {
      start: this._startingBeach,
      end: this._endingBeach,
      waypoints: this._waypoints,
    };
  }
}
