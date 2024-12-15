import LoginPage from "../pages/Login";
import MainPage from "../pages/Main";
import ProfilePage from "../pages/Profile";
import ErrorPage from "../pages/Error";

export const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "*": ErrorPage,
};

export function initRouter() {
  window.addEventListener("popstate", handleLocation);
  document.body.addEventListener("click", onClickLink);
}

function handleLocation() {
  const path = window.location.pathname;
  const page = routes[path] || ErrorPage;

  const $app = document.querySelector(".App");
  if ($app) {
    $app.innerHTML = page.template();
  }
}

function onClickLink(e) {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.href);
  }
}

export function navigate(url) {
  history.pushState(null, null, url);
  handleLocation();
}
