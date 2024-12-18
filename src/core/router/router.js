import { Auth } from "../../auth/auth";
import { PAGES, ID } from "../../common/const";
import render from "../render/render";
import ROUTES from "../router/routes";

const updateRoute = (pathname) => {
  let route = ROUTES[pathname] ? pathname : "#";
  route =
    route === PAGES.PROFILE_PAGE && !Auth.isLoggedIn ? PAGES.LOGIN_PAGE : route;
  return route;
};

const handleAfterRender = (route) => {
  switch (route) {
    case PAGES.LOGIN_PAGE:
      document.getElementById(ID.LOGIN_FORM).addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById(ID.LOGIN_USER_NAME).value;
        Auth.login({
          username,
          email: "",
          bio: "",
        });
        router.push(PAGES.MAIN_PAGE);
      });
      break;
    case PAGES.MAIN_PAGE:
      if (Auth.isLoggedIn) {
        document.getElementById(ID.LOGOUT).addEventListener("click", () => {
          Auth.logout();
        });
      }
      break;
    case PAGES.PROFILE_PAGE:
      document.getElementById(ID.LOGOUT).addEventListener("click", () => {
        Auth.logout();
      });
      break;
  }
};

export const router = {
  push: (pathname) => {
    const route = updateRoute(pathname);
    history.pushState({}, "", route);
    render(route);
    handleAfterRender(route);
  },
  replace: (pathname) => {
    const route = updateRoute(pathname);
    history.replaceState({}, "", route);
    render(route);
    handleAfterRender(route);
  },
};
