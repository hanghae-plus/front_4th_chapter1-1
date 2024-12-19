import Error404Page from "./pages/404/404";
import HomePage from "./pages/home/home-page";
import LoginPage from "./pages/login/login-page";
import { ProfilePage } from "./pages/profile/profile-page";

export const routes = {
  target: (pathname, hash) => {
    if (pathname === "/" && hash === "") {
      return HomePage;
    }

    if (hash === "") {
      const routeList = {
        "^/$": HomePage,
        "^/login": LoginPage,
        "^/profile": ProfilePage,
        ".*": Error404Page,
      };

      return routeList[
        Object.keys(routeList).find((route) =>
          new RegExp(route).test(pathname),
        ) ?? ".*"
      ];
    }

    const routeList = {
      "^#/$": HomePage,
      "^#/login": LoginPage,
      "^#/profile": ProfilePage,
      ".*": Error404Page,
    };

    return routeList[
      Object.keys(routeList).find((route) => new RegExp(route).test(hash)) ??
        ".*"
    ];
  },
};

export const App = {
  render: () => {
    const CurrentPage = routes.target(
      window.location.pathname,
      window.location.hash,
    );
    document.querySelector("#root").innerHTML = CurrentPage();
    CurrentPage.eventFn?.();
  },
};
