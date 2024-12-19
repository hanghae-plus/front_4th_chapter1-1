import createRouter from "./lib/router.js";
import { setupEventHandlers } from "./lib/eventHandlers.js";

const hashRouter = createRouter("hash");
hashRouter.init("root");
setupEventHandlers(hashRouter);
