class Page {
  constructor(query) {
    this.parent = document.querySelector(query);
  }
  render() {
    this.parent.insertAdjacentHTML("beforeend", this.getHtml());
    this.addEventListeners();
  }
  getHtml() {
    return ``;
  }

  addEventListeners() {}
}
export default Page;
