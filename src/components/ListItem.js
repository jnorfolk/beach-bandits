export default class ListItem {
  constructor(templateId) {
    this._id = templateId;
  }

  generateListItem(beach) {
    this._listElement = document
      .querySelector(this._id)
      .content.querySelector(".selection__dropdown-option")
      .cloneNode(true);
    this._listElement.textContent = beach.NAME;

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
