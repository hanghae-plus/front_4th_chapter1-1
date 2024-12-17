import { createRouter } from "./app/router";
import { routes } from "./app/router/routes";

const rootElement = document.getElementById("root");

if (rootElement) {
  const router = createRouter({
    mode: "hash",
    root: rootElement,
  });

  routes.forEach((route) => router.addRoute(route));
  router.init();
}
