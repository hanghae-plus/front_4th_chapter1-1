import browserRouter from "./router/browser-router";

browserRouter(location.pathname);

window.addEventListener("popstate", () => {
  browserRouter(location.pathname, false);
});
