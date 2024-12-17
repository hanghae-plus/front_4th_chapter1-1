import { router } from "./lib/router.js";
import { setupEventHandlers } from "./lib/eventHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
  router.init("root");
  setupEventHandlers();
});
