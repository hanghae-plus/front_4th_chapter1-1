import { createRouter } from "./router/router";
import { setupEventListeners } from "./managers/eventManager.js";

const root = document.getElementById("root");
const { navigate } = createRouter(root);
setupEventListeners(navigate);
