export class Store {
  constructor() {
    this.user = null;
  }

  getState() {
    this.user = JSON.parse(localStorage.getItem("user"));
    return this.user;
  }

  setState(state) {
    this.user = state;
    localStorage.setItem("user", JSON.stringify(state));
    return this.user;
  }

  deleteState() {
    localStorage.clear();
  }
}
