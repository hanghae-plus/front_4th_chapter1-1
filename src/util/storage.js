class Storage {
  set(key, item) {
    const itemStr = JSON.stringify(item);
    localStorage.setItem(key, itemStr);
  }
  get(key) {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}

let storage = new Storage();
export default storage;
