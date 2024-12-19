import { resolveRoute } from "./router/router.js";

const initializeRouter = () => {
  window.addEventListener("hashchange", resolveRoute);
  window.addEventListener("popstate", resolveRoute);
  window.addEventListener("load", resolveRoute);
};

initializeRouter();
