import { RoutesSingleton } from "./routerSingleton.js";

export const createRoutes = () => {
  const { getInstance } = RoutesSingleton();

  const { handlePopState, ...instance } = getInstance();

  window.addEventListener("popstate", (event) => {
    event.preventDefault();
    handlePopState();
  });

  window.addEventListener("load", (event) => {
    event.preventDefault();
    handlePopState();
  });

  return { handlePopState, ...instance };
};
