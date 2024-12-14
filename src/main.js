import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Router } from "./Router";

function renderApp() {
  const TargetPage = (() => {
    switch (Router.pathname) {
      case "/":
        return MainPage;
      case "/login":
        return LoginPage;
      case "/profile":
        return ProfilePage;
      default:
        return NotFoundPage;
    }
  })();

  document.querySelector("#root").innerHTML = TargetPage();

  Router.init({ callback: renderApp });
  TargetPage?.init?.();
}

renderApp();
