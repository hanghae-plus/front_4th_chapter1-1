import { router } from "./utils/router";

document.body.querySelector("#root").innerHTML = "";

window.addEventListener("load", () => {
  router();
});
window.addEventListener("popstate", () => {
  router();
});
