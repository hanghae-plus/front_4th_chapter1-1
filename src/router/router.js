import { ErrorPage } from "../components/pages/ErrorPage";
import { LoginPage } from "../components/pages/LoginPage";
import { MainPage } from "../components/pages/MainPage";
import { ProfilePage } from "../components/pages/ProfilePage";
import { state, subscribe } from "../store/store";
import { initLogin } from "./../events/login";
import { initProfile } from "./../events/profile";
import { initNavigation } from "./../events/navigation";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

export const router = () => {
  const root = document.getElementById("root");

  if (!root) return;

  const path = window.location.pathname;
  const render = routes[path] || ErrorPage;

  // 404페이지
  if (!state.user && path === "/profile") {
    root.innerHTML = LoginPage();
    return;
  }

  root.innerHTML = render(render === LoginPage ? null : state.user);

  if (path === "/login") initLogin();
  else if (path === "/profile") initProfile();
  else if (path === "/") initNavigation();
};

subscribe(() => {
  router();
});
