import { CreateRouter } from "./routes/createRouter.js";
import { routes } from "./routes/routes.js";

const createRouter = new CreateRouter(routes);
Object.values(routes).forEach((route) => route.setRouter(createRouter));

createRouter.init();
