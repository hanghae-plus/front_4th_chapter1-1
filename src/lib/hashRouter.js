import UserStore from "./user";
import { Router } from "./router";

class HashRouter extends Router {
  init() {
    this.container = document.getElementById("root");
    this.container.innerHTML = "";

    window.addEventListener("hashchange", (e) => {
      e.preventDefault();
      this.linkRoute(location.hash.replace("#", ""));
    });

    document.addEventListener("click", (e) => {
      const isLink = e.target.closest("a");
      if (!isLink) return;
      e.preventDefault();

      if (isLink.id === "logout") UserStore.logout();

      const path = isLink.hash ? isLink.hash.replace("#", "") : isLink.pathname;
      this.navigation(path);
    });

    document.addEventListener("DOMContentLoaded", () => {
      this.navigation(location.hash.replace("#", "") || "/");
    });
  }

  navigation(pathname) {
    history.pushState({ path: pathname }, null, `#${pathname}`);
    this.linkRoute(pathname);
  }
}

export { HashRouter };
