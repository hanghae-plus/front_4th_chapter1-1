import { router } from "@/core/router";

const DOMAIN = "localhost:5173";

(function init() {
  router.navigateTo(window.location.pathname);

  window.addEventListener("popstate", () => {
    router.navigateTo(window.location.pathname);
  });

  window.addEventListener("hashchange", () => {
    const pathname = window.location.hash.split("#")[1];
    router.navigateTo(pathname);
  });

  window.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  window.addEventListener("click", (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      e.preventDefault();

      const href = e.target.href;
      const link = href.replace(new RegExp(`.*${DOMAIN}(.*)`), "$1");

      if (link) router.navigateTo(link);
    }
  });
})();
