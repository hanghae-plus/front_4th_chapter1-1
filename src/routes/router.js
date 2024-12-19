import { RoutesSingleton } from "./routerSingleton.js";

export const createRoutes = () => {
  const { getInstance } = RoutesSingleton();

  const { handlePopState, ...instance } = getInstance();

  window.addEventListener("popstate", handlePopState);

  return { handlePopState, ...instance };
};
