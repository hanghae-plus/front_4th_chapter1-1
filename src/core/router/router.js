import render from "../render/render";
import ROUTES from "../router/routes";

export const router = {
  push: (pathname) => {
    const route = ROUTES[pathname] ? pathname : "#";
    history.pushState({}, "", route);
    render(route);
  },
  replace: (pathname) => {
    const route = ROUTES[pathname] ? pathname : "#";
    history.replaceState({}, "", route);
    render(route);
  },
};
