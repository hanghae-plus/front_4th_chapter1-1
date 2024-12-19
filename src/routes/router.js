import "./event/eventHandler.js";
import { RoutesSingleton } from "./routerSingleton.js";

export const createRoutes = () => {
  const { getInstance } = RoutesSingleton();
  return getInstance();
};
