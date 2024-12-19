class Store {
  constructor(key) {
    this.key = key;
    this.value = localStorage.getItem(this.key)
      ? JSON.parse(localStorage.getItem(this.key))
      : null;
  }
  get() {
    return this.value;
  }

  set(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
    this.value = value;
  }

  clear() {
    localStorage.removeItem(this.key);
    this.value = null;
  }
}

export default Store;
