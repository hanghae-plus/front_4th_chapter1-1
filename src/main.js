import { router } from "./router/router.js";
import { initEvents } from "./events/index.js";

document.addEventListener("DOMContentLoaded", () => {
  router();
  initEvents();
});

window.addEventListener("popstate", router);
