import { createRouter } from "./app/router";
import { routes } from "./app/router/routes";

const rootElement = document.getElementById("root");

const MODE = "history";

if (rootElement) {
  const router = createRouter({
    mode: MODE,
    root: rootElement,
  });

  routes.forEach((route) => router.addRoute(route));
  router.init();
}
