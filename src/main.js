import HomePage from "./page/home";
import ProfilePage from "./page/profile";
import LoginPage from "./page/login";
import ErrorPage from "./page/error";
import Router from "./router/router";
import { isAuthenticated } from "./util/login";
(function (global) {
  function $(selector) {
    return document.querySelector(selector);
  }

  global.$ = $;
})(window);

const routerMap = {
  "/": { component: HomePage },
  "/profile": { component: ProfilePage, authRequired: true },
  "/login": { component: LoginPage },
  "/error": { component: ErrorPage },
};

const routerGuard = (path) => {
  if (path === "/profile" && !isAuthenticated()) {
    return "/login";
  }
  if (path === "/login" && isAuthenticated()) {
    return "/";
  }
  return path;
};

const router = new Router(routerMap, routerGuard);

const initPage = () => {
  router.renderPage(window.location.pathname);
};

initPage();

$("#root").addEventListener("click", (event) => {
  if (
    router.currentPage &&
    typeof router.currentPage.handleEvent === "function"
  ) {
    router.currentPage.handleEvent(event);
  }
});

$("#root").addEventListener("submit", (event) => {
  if (
    router.currentPage &&
    typeof router.currentPage.handleEvent === "function"
  ) {
    router.currentPage.handleEvent(event);
  }
});
