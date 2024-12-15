import { initRouter } from "./router/router";
import createPageFactory from "./pages";

document.addEventListener("DOMContentLoaded", () => {
  initRouter();

  const $app = document.querySelector(".App");
  const pages = createPageFactory($app);

  pages.main();
});
