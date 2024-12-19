import Store from "./core/Store";

class FeatureStore extends Store {
  static instance = null;
  constructor() {
    const currentFeature = window.location.pathname;
    super({ feature: currentFeature });
  }

  getFeature = () => {
    return this._getState().feature;
  };

  setFeature = (feature) => {
    if (feature.includes("/")) {
      feature = this._pathToFeature(feature);
    }
    this._setState({ feature });
  };

  _pathToFeature = (path) => {
    const pathMap = {
      "/": "main",
      "/profile": "profile",
      "/login": "login",
      "/logout": "logout",
    };
    return pathMap[path];
  };
}

const featureStore = new FeatureStore();

export default featureStore;
