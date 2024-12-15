import { ErrorPage } from "../components/pages/ErrorPage";
import { LoginPage } from "../components/pages/LoginPage";
import { MainPage } from "../components/pages/MainPage";
import { ProfilePage } from "../components/pages/ProfilePage";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

export const router = () => {
  const path = window.location.pathname;
  const render = routes[path] || ErrorPage;

  if (!localStorage.getItem("user") && path === "/profile") {
    document.body.innerHTML = LoginPage();
    return;
  }

  document.body.innerHTML = render();
};
