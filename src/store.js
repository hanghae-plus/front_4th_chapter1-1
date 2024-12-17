import { App } from "./app";

const persistentState = {
  isPersistent: (key) => {
    return localStorage.getItem(key) !== null;
  },
  setPersistent: (key) => {
    localStorage.setItem(key, true);
  },
  resetKey: (key) => {
    localStorage.removeItem(key);
  },
};

function createStore({ afterUpdate = () => {} }) {
  const state = new Map();

  return {
    get: (key) => {
      if (persistentState.isPersistent(key)) {
        return JSON.parse(localStorage.getItem(key));
      } else {
        return state.get(key);
      }
    },
    set: (key, value, { persistent } = { persistent: false }) => {
      if (persistent) {
        persistentState.setPersistent(key);
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        persistentState.resetKey(key);
        localStorage.removeItem(key);
        state.set(key, value);
      }
      afterUpdate();
    },
    remove: (key) => {
      localStorage.removeItem(key);
      state.set(key, null);
      persistentState.resetKey(key);
      afterUpdate();
    },
  };
}

export const store = createStore({ afterUpdate: () => App.render() });
