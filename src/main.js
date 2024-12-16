import { CreateRouter } from "./routes/createRouter.js";
import { routes } from "./routes/routes.js";

const createRouter = new CreateRouter(routes);
createRouter.init();

// page에 router 주입
Object.values(routes).map((route) => route.setRouter(createRouter));
