import browserRouter from "./router/browser-router";
import hashRouter from "./router/hash-router";

if (location.hash) {
  hashRouter(location.hash.slice(1));
}

browserRouter(location.pathname);

window.addEventListener("popstate", () => {
  browserRouter(location.pathname, false);
});

window.addEventListener("hashchange", () => {
  hashRouter(location.hash.slice(1));
});
