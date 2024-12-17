import { router } from "./lib/router.js";
import { setupEventHandlers } from "./lib/eventHandlers.js";

router.init("root");
setupEventHandlers();
