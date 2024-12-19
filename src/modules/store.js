import { withObserver } from "../hof/withObserver";

export const store = withObserver({
  get: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    store.notify();
  },
  remove: (key) => {
    localStorage.removeItem(key);
    store.notify();
  },
});
