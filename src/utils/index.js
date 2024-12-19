export const Storage = (function () {
  function save(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log(error);
    }
  }

  function load(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    save,
    load,
    clear,
  };
})();
