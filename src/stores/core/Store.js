class Store {
  static instance = null;
  constructor(initialState) {
    if (Store.instance) {
      return Store.instance;
    }
    Store.instance = this;
    this.state = initialState;
  }

  _setState = (newState) => {
    this.state = { ...this.state, ...newState };
  };

  _getState = () => {
    return this.state;
  };
}

export default Store;
