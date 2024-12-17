import { MainPage } from "./pages/mainPage.js";
import { attachLoginHandler, LoginPage } from "./pages/loginPage.js";
import { ProfilePage } from "./pages/profilePage.js";
import { ErrorPage } from "./pages/errorPage.js";

// 로그아웃
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout") {
    e.preventDefault();
    localStorage.clear();
    // console.log("세션 삭제 완료")
  }
});

// 라우터
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
  let path = window.location.pathname;
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (path === "/profile" && !user.username) {
    path = "/login";
    window.history.pushState(null, null, "/login");
  }
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
