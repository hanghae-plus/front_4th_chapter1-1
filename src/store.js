import { Router } from "./Router";

const persistentState = {
  isPersistent: (key) => {
    return localStorage.getItem(`${key}`) !== null;
  },
  setPersistent: (key) => {
    localStorage.setItem(`${key}`, true);
  },
  resetKey: (key) => {
    localStorage.removeItem(`${key}`);
  },
};

function createStore(callback = () => {}) {
  const state = new Map();

  return {
    get: (key) => {
      if (persistentState.isPersistent(key)) {
        return JSON.parse(localStorage.getItem(`${key}`));
      } else {
        return state.get(key);
      }
    },
    set: (key, value, { persistent } = { persistent: false }) => {
      if (persistent) {
        persistentState.setPersistent(key);
        localStorage.setItem(`${key}`, JSON.stringify(value));
      } else {
        persistentState.resetKey(key);
        localStorage.removeItem(`${key}`);
        state.set(key, value);
      }
      callback();
    },
    remove: (key) => {
      state.delete(key);
      persistentState.resetKey(key);
    },
  };
}

export const userStore = createStore(() => Router.callback());
