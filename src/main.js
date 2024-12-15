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
  const selected = e.target.closest("a");
  if (selected && selected.getAttribute("href")) {
    e.preventDefault();
    const path = selected.getAttribute("href");
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
