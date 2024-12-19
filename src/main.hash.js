import { createRouter } from "./app/router";
import { routes } from "./app/router/routes";

const rootElement = document.getElementById("root");

// TODO: 객체 매핑 고려
const MODE = "hash";

if (rootElement) {
  const router = createRouter({
    mode: MODE,
    root: rootElement,
  });

  routes.forEach((route) => router.addRoute(route));
  router.init();
}
