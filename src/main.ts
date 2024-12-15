import createRouter from "./core/createRouter";
import { routes } from "./routes";

let router: ReturnType<typeof createRouter>;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector<HTMLElement>("#root");

  if (!container) {
    throw new Error("Couldn't find root element!");
  }

  router = createRouter(container, routes);
  router.init();
});

export const useRouter = () => {
  if (!router) {
    throw new Error("Router not initialized!");
  }

  return router;
};
