import { HomePage, NotFoundPage, ProfilePage, LoginPage } from "./pages/index";
import { HashRouter } from "./lib/hashRouter";

const hashRouter = new HashRouter();

hashRouter.createRoutes({
  "/": { component: HomePage },
  "/profile": { component: ProfilePage, requiresAuth: true },
  "/login": { component: LoginPage },
  notFound: { component: NotFoundPage },
});
