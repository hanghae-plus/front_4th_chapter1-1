import { initRouter } from "./app/router";

const rootElement = document.querySelector("#root");

if (rootElement) {
  initRouter(document.getElementById("root"), "history");
}
