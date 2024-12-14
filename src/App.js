import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const App = {
  render: () => {
    const TargetPage = (() => {
      switch (window.location.pathname) {
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

    TargetPage?.init?.();
  },
};
