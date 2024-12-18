import { Auth } from "../../auth/auth";
import { PAGES } from "../../common/const";
import render from "../render/render";
import ROUTES from "../router/routes";

export const router = {
  push: (pathname) => {
    let route = ROUTES[pathname] ? pathname : "#";
    route =
      route === PAGES.PROFILE_PAGE && !Auth.isLoggedIn
        ? PAGES.LOGIN_PAGE
        : route;
    history.pushState({}, "", route);
    render(route);
  },
  replace: (pathname) => {
    let route = ROUTES[pathname] ? pathname : "#";
    route =
      route === PAGES.PROFILE_PAGE && !Auth.isLoggedIn
        ? PAGES.LOGIN_PAGE
        : route;
    history.replaceState({}, "", route);
    render(route);
  },
};
