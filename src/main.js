import createRouter from "./lib/router.js";
import { setupEventHandlers } from "./lib/eventHandlers.js";

const historyRouter = createRouter("history");
historyRouter.init("root");
setupEventHandlers(historyRouter);
