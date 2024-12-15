import { initRouter } from "./router/router";
import MainPage from "./pages/Main";

document.addEventListener("DOMContentLoaded", () => {
  initRouter();

  const $app = document.querySelector(".App");
  new MainPage($app);
});
