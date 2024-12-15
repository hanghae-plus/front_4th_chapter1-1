import Router from "./router/Router";
import createPageFactory from "./pages";

document.addEventListener("DOMContentLoaded", () => {
  const $app = document.querySelector(".App");
  const pages = createPageFactory($app);

  const router = new Router($app);
  router.addRoute("/", pages.main);
  router.addRoute("/profile", pages.profile);
  router.addRoute("/login", pages.login);
  router.addRoute("*", pages.error);
  router.handleRoute();
});
