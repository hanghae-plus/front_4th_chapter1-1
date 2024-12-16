import createRouter from "./core/createRouter";

let router: ReturnType<typeof createRouter>;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector<HTMLElement>("#root");

  if (!container) {
    throw new Error("Couldn't find root element!");
  }

  router = createRouter(container);
  router.init();
});

export const useRouter = () => {
  if (!router) {
    throw new Error("Router not initialized!");
  }

  return router;
};
