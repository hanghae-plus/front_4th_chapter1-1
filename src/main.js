import { CreateRouter } from "./routes/createRouter.js";
import { routes } from "./routes/routes.js";

const createRouter = new CreateRouter(routes);

createRouter.init();
