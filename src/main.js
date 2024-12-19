import { HomePage, NotFoundPage, ProfilePage, LoginPage } from "./pages/index";
import { Router } from "./lib/router";

const router = new Router();

router.createRoutes({
  "/": { component: HomePage },
  "/profile": { component: ProfilePage, requiresAuth: true },
  "/login": { component: LoginPage },
  notFound: { component: NotFoundPage },
});
