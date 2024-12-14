import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";

import { SPARouter } from "./SPARouter";

function renderApp() {
  document.body.innerHTML = (() => {
    switch (SPARouter.pathname) {
      case "/":
        return MainPage();
      case "/login":
        return LoginPage();
      case "/profile":
        return ProfilePage();
      default:
        return ErrorPage();
    }
  })();

  SPARouter.init({ callback: renderApp });
}

renderApp();
