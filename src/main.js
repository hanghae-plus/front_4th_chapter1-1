import {
  renderErrorPage,
  renderLoginPage,
  renderProfilePage,
  renderMainPage,
} from "./pages/renderPage";
import { createRouter } from "./router/router";

const routes = {
  "/": renderMainPage,
  "/profile": renderProfilePage,
  "/login": renderLoginPage,
  "/404": renderErrorPage,
};

createRouter(routes);
