import Subject from "./Subject";

class Store extends Subject {
  constructor(initialState) {
    super();
    this.state = initialState;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifyObservers(this.state);
  }

  getState() {
    return this.state;
  }
}

export default Store;
