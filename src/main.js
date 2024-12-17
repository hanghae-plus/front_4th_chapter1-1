import { router } from "./utils/router";

window.addEventListener("load", () => {
  router();
});
window.addEventListener("popstate", () => {
  router();
});
window.addEventListener("hashchange", () => {
  router();
});
