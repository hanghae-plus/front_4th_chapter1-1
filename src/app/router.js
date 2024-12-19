import Routes from "./routes";
import userService from "../features/UserService";
import { Store } from "../features";

const store = Store.getInstance();

export const historyRouter = (path) => {
  store.clearListeners();

  const pathToGo = interceptor(path);

  history.pushState({}, "", pathToGo);

  const page = Routes[pathToGo] ?? Routes[404];
  const { view, init } = page();

  document.querySelector("#root").innerHTML = view;
  init();
};

export const hashRouter = (hash) => {
  store.clearListeners();

  const path = hash.replace("#", "");
  const pathToGo = interceptor(path);

  window.location.hash = pathToGo;

  const page = Routes[pathToGo] ?? Routes[404];
  const { view, init } = page();

  document.querySelector("#root").innerHTML = view;
  init();
};

const interceptor = (path) => {
  let redirectedPath;

  if (path === "/profile" && !userService.isLoggedIn()) {
    redirectedPath = "/login";
  }

  if (path === "/login" && userService.isLoggedIn()) {
    redirectedPath = "/";
  }

  return redirectedPath ?? path;
};

const router = (path) =>
  window.location.hash ? hashRouter(path) : historyRouter(path);

export default router;
