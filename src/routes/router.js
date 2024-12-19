import { RoutesSingleton } from "./routerSingleton.js";

export const createRoutes = () => {
  const { handlePopState, ...instance } = RoutesSingleton.getInstance();

  window.addEventListener("popstate", () => {
    handlePopState();
  });

  window.addEventListener("load", () => {
    handlePopState();
  });

  return { handlePopState, ...instance };
};
