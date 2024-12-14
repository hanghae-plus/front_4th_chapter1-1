import { addEventListenerToLink } from "./functions";

export const initStyle = () => {
  addEventListenerToLink();
  window.addEventListener("popstate", addEventListenerToLink);
  window.addEventListener("urlChange", addEventListenerToLink);
};
