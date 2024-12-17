import router from "./router/router";

router(location.pathname);

window.addEventListener("popstate", () => {
  router(location.pathname, false);
});
