import routerGuard from "./RouterGuard.js";
import routes from "./Route.js";

let currentPath = "/";

export const historyRouter = (historyPath) => {
  const path = routerGuard(historyPath);
  history.pushState({}, path);
  currentPath = path;
  const page = routes[path] ?? routes[404];
  const { html, init } = page();
  document.getElementById("root").innerHTML = html;
  init();
};

export const hashRouter = (hash) => {
  const hashPath = hash.replace("#", "");
  const path = routerGuard(hashPath);

  window.location.hash = path;

  const page = routes[path] ?? routes[404];
  const { html, init } = page();

  document.getElementById("root").innerHTML = html;
  init();
};

const router = (path) =>
  window.location.hash ? hashRouter(path) : historyRouter(path);

export const getCurrentPath = () => currentPath;

export default router;
