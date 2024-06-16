export default class ListItem {
  constructor(listId) {
    this._id = listId;
  }

  generateListItem(beach) {
    this._listElement = document
      .querySelector(this._id)
      .content.querySelector(".selection__dropdown-option")
      .cloneNode(true);
    this._listElement.textContent = beach.address;

    return this._listElement;
  }
}
