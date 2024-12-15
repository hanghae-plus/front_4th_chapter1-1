import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function isMainPage() {
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  if (pathname === "/" && hash === "") {
    return true;
  }

  if (hash === "") {
    return /^\/$/.test(pathname);
  }

  return /^#\/$/.test(hash);
}

export const Routes = {
  target: (pathname, hash) => {
    if (pathname === "/" && hash === "") {
      return MainPage;
    }

    if (hash === "") {
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
    }

    const routeList = {
      "^#/$": MainPage,
      "^#/login": LoginPage,
      "^#/profile": ProfilePage,
      ".*": NotFoundPage,
    };

    return routeList[
      Object.keys(routeList).find((route) => new RegExp(route).test(hash)) ??
        ".*"
    ];
  },
};
