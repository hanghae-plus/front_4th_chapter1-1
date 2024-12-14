import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const Routes = {
  target: (pathname) => {
    const routeList = {
      "^/$": MainPage,
      "^/login": LoginPage,
      "^/profile": ProfilePage,
      ".*": NotFoundPage,
    };

    return routeList[
      Object.keys(routeList).find((route) =>
        new RegExp(route).test(pathname),
      ) ?? ".*"
    ];
  },
};
