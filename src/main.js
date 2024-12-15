import { router } from "./router/router.js";
import { initNavigation } from "./events/navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  router();
  initNavigation();
});

window.addEventListener("popstate", router);
