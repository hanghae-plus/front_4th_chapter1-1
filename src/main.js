import { Router } from "./router/router";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";

window.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  const checkAuth = () => {
    const user = localStorage.getItem("user");
    if (!user && window.location.pathname === "/profile") {
      window.location.href = "/login";
      return false;
    }
    return true;
  };

  const routes = {
    "/": () => MainPage(),
    "/login": () => {
      if (localStorage.getItem("user")) {
        window.location.href = "/";
        return;
      }
      return LoginPage();
    },
    "/profile": () => {
      if (checkAuth()) return ProfilePage();
    },
    404: () => ErrorPage(),
  };

  new Router(routes);
});
