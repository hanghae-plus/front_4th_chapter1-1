import { SPARouter } from "./SPARouter";

const persistentState = {
  isPersistent: (namespace, key) => {
    return localStorage.getItem(`${namespace}.${key}`) !== null;
  },
  setPersistent: (namespace, key) => {
    localStorage.setItem(`${namespace}.${key}`, true);
  },
  resetKey: (namespace, key) => {
    localStorage.removeItem(`${namespace}.${key}`);
  },
};

function createStore(namespace = "global", callback = () => {}) {
  const state = new Map();

  return {
    get: (key) => {
      if (persistentState.isPersistent(namespace, key)) {
        return JSON.parse(localStorage.getItem(`${namespace}.${key}`));
      } else {
        return state.get(key);
      }
    },
    set: (key, value, { persistent } = { persistent: false }) => {
      if (persistent) {
        persistentState.setPersistent(namespace, key);
        localStorage.setItem(`${namespace}.${key}`, JSON.stringify(value));
      } else {
        persistentState.resetKey(namespace, key);
        localStorage.removeItem(`${namespace}.${key}`);
        state.set(key, value);
      }
      callback();
    },
    remove: (key) => {
      state.delete(key);
      persistentState.resetKey(namespace, key);
    },
  };
}

export const defaultStore = createStore("global", () => SPARouter.callback());

export const userStore = createStore("user", () => SPARouter.callback());
