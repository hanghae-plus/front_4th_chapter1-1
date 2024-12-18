import { getAuth, logout } from "../auth/auth";
import Router from "../router/router";
import Controller from "./Controller";

class NavbarController extends Controller {
  attachListeners() {
    this.addListener("click", ".nav-link", (e) => {
      const target = e.target.closest("a");
      if (!(target instanceof HTMLAnchorElement)) return;

      e.preventDefault();

      if (target.id === "logout") {
        this.handleLogout();
      }

      const targetURL = e.target.getAttribute("href");
      const router = new Router();
      router.navigate(targetURL);
    });
  }

  handleLogout() {
    logout();
  }

  get auth() {
    return getAuth();
  }

  isMainPage() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    // 현재 경로가 "/"이고 해시가 없거나 "#"인 경우
    if (currentPath === "/" || currentHash === "#/") {
      return true;
    }

    return false;
  }
}

export default NavbarController;
