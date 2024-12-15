import Router from "./router/Router";
import createPageFactory from "./pages";
import { getAuth } from "./auth/auth";

document.addEventListener("DOMContentLoaded", () => {
  const $app = document.querySelector(".App");
  const pages = createPageFactory($app);

  const router = new Router($app);
  router.addRoute("/", pages.main);
  router.addRoute("/profile", pages.profile);
  router.addRoute("/login", pages.login);
  router.addRoute("*", pages.error);
  if (!getAuth()) {
    router.navigateTo("/login");
  } else {
    router.navigateTo("/");
  }
});
