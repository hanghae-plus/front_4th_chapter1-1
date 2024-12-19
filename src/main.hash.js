import { resolveRoute } from "./router/router.js";

const initializeRouter = () => {
  window.addEventListener("hashchange", () => resolveRoute(true));
  window.addEventListener("load", () => resolveRoute(true));
};

initializeRouter();
