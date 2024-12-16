import { Main } from "./main.js";
import { LoginPage } from "./pages/loginPage.js";
import { ProfilePage } from "./pages/profilePage.js";
import { ErrorPage } from "./pages/errorPage.js";

document.body.innerHTML = Main();

const routes = {
  "/": () => Main(),
  "/login": () => LoginPage(),
  "/profile": () => ProfilePage(),
};

// 라우터 함수
const router = () => {
  const path = window.location.pathname;
  const route = routes[path];
  if (route) {
    document.body.innerHTML = route();
  } else {
    document.body.innerHTML = ErrorPage();
  }
  routeHandlers();
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

const routeHandlers = () => {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      window.history.pushState(null, null, href);
      router();
    });
  });
};

routeHandlers();
