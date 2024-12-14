import createRouter from "./core/createRouter";
import { routes } from "./routes";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector<HTMLElement>("#root");

  if (!container) {
    throw new Error("Couldn't find root element!");
  }

  const { init } = createRouter(container, routes);
  init();
});
