import { resolveRoute } from "./router/router.js";

const initializeRouter = () => {
  window.addEventListener("popstate", () => resolveRoute(false));
  window.addEventListener("load", () => resolveRoute(false));
};

initializeRouter();
