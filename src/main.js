import { router } from "./core/router/router";

document.addEventListener("DOMContentLoaded", () => {
  router.push(location.pathname);
  document.body.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && e.target.getAttribute("href")) {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      router.push(href);
    }
  });
});

window.addEventListener("popstate", () => {
  const pathname = location.pathname;
  router.replace(pathname);
});
