import MainPage from "./page/main";
import ProfilePage from "./page/profile";
import LoginPage from "./page/login";
import ErrorPage from "./page/error";
import Router from "./router";

(function (global) {
  function $(selector) {
    return document.querySelector(selector);
  }

  global.$ = $;
})(window);

const app = () => {
  const routerMap = {
    "/": { component: MainPage },
    "/profile": { component: ProfilePage, authRequired: true },
    "/login": { component: LoginPage },
    "/error": { component: ErrorPage },
  };

  const router = new Router(routerMap);
  const currentPath = window.location.pathname;
  router.push(currentPath);
};

app();

$("#root").addEventListener("click", (event) => {
  const router = new Router();
  if (event.target.tagName === "A") {
    event.preventDefault(); // 기본 동작 막기

    const path = event.target.getAttribute("href");
    router.push(path);
  }
});
