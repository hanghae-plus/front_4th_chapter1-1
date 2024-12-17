export default class UserPreferences {
  constructor() {
    this.preferences = JSON.parse(localStorage.getItem("user")) || {};
  }

  set(key, value) {
    this.preferences[key] = value;
    this.save();
    window.dispatchEvent(new CustomEvent("userPreferencesChanged"));
  }

  get(key) {
    return this.preferences[key];
  }

  save() {
    localStorage.setItem("user", JSON.stringify(this.preferences));
  }

  remove() {
    this.preferences = {};
    localStorage.removeItem("user");
    window.dispatchEvent(new CustomEvent("userPreferencesChanged"));
  }
}
