import { ErrorPage } from "./components/pages/ErrorPage";
import { LoginPage } from "./components/pages/LoginPage";
import { MainPage } from "./components/pages/MainPage";
import { ProfilePage } from "./components/pages/ProfilePage";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

const router = () => {
  const path = window.location.pathname;
  const render = routes[path] || ErrorPage;
  document.body.innerHTML = render();
};

const handleNavigation = (e) => {
  if (e.target.tagName === "a" && e.target.getAttribute("href")) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    history.pushState({}, "", path);
    router();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  router();
  document.body.addEventListener("click", handleNavigation);
});

// 뒤로가기/앞으로가기
window.addEventListener("popstate", router);
