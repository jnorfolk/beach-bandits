export default class RouteItem {
  constructor(templateId) {
    this._id = templateId;
  }

  generateRouteItem(routeName, routeCounter) {
    this._listElement = document
      .querySelector(this._id)
      .content.querySelector(".routes__list-item")
      .cloneNode(true);
    this._listTitle = this._listElement.querySelector(".routes__title");
    this._listSubtitle = this._listElement.querySelector(".routes__subtitle");
    this._listTitle.textContent = routeCounter;
    this._listSubtitle.textContent = routeName;

    return this._listElement;
  }
}
