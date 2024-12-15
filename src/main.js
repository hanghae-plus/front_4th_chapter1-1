import { initRouter, routes } from "./router/router";

document.addEventListener("DOMContentLoaded", () => {
  initRouter();
});

const $app = document.querySelector(".App");

$app.innerHTML = routes["/"].template();
