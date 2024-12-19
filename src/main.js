import { listeners } from "./utils";

const addListener = (type) => {
  window.addEventListener(type, listeners[type]);
};

["click", "submit", "popstate", "hashchange", "DOMContentLoaded"].forEach(
  addListener,
);
