import { navAction, submitAction } from "./utils/EvnetHandler";
import Router from "./router/Router";

const { router } = Router();

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    navAction(e);
  });
  router();
});

document.addEventListener("submit", (e) => submitAction(e));
