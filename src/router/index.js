import {
  renderHomePage,
  renderLoginPage,
  renderNotFoundPage,
  renderProfilePage,
} from "@/pages";
import CreateRouter from "@/router/createRouter";

const routes = {
  "/": renderHomePage,
  "/login": renderLoginPage,
  "/profile": renderProfilePage,
  "/404": renderNotFoundPage,
};

export const router = new CreateRouter(routes, { mode: "history" });
