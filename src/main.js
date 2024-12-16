import { MainPage } from "./pages/mainPage.js";
import { attachLoginHandler, LoginPage } from "./pages/loginPage.js";
import { ProfilePage } from "./pages/profilePage.js";
import { ErrorPage } from "./pages/errorPage.js";

const routes = {
  "/": () => MainPage(),
  "/login": () => LoginPage(),
  "/profile": () => ProfilePage(),
};

const routeHandlers = () => {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      navigateTo(href);
    });
  });
};

const router = () => {
  const path = window.location.pathname;
  const route = routes[path];
  if (route) {
    document.body.innerHTML = route();
  } else {
    document.body.innerHTML = ErrorPage();
  }

  if (path === "/login") {
    attachLoginHandler();
  }
  routeHandlers();
};

export const navigateTo = (path) => {
  window.history.pushState(null, null, path);
  router();
};

window.addEventListener("popstate", router);
window.addEventListener("load", router);
