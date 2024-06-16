export default class ListItem {
  constructor(templateId) {
    this._id = templateId;
  }

  generateListItem(route) {
    this._listElement = document
      .querySelector(this._id)
      .content.querySelector(".selection__dropdown-option")
      .cloneNode(true);
    this._listElement.textContent = route[0].name;
    console.log(route[0].name);

    return this._listElement;
  }

  returnOption(beachRoutes) {
    this._listElement = document
      .querySelector(this._id)
      .content.querySelector(".selection__dropdown-option")
      .cloneNode(true);
    this._listElement.textContent = beachRoutes[0];

    return this._listElement;
  }
}
