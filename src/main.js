import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";
import { SPARouter } from "./SPARouter";

function renderApp() {
  const TargetPage = (() => {
    switch (SPARouter.pathname) {
      case "/":
        return MainPage;
      case "/login":
        return LoginPage;
      case "/profile":
        return ProfilePage;
      default:
        return ErrorPage;
    }
  })();

  document.body.innerHTML = TargetPage();

  SPARouter.init({ callback: renderApp });
  TargetPage?.init?.();
}

renderApp();
