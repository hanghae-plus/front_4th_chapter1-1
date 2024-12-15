import { MainPage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { ProfilePage } from "../pages/profile";
import { ErrorPage } from "../pages/error";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
  "/error": ErrorPage,
};

class Router {
  constructor(root) {
    this.root = root;
    this.init();
  }

  init() {
    window.addEventListener("popstate", () => this.handleRoute());
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        this.navigate(e.target.getAttribute("href"));
      }
    });
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;

    // 라우트 가드
    if (path === "/profile" && !localStorage.getItem("user")) {
      this.navigate("/login");
      return;
    }

    if (path === "/login" && localStorage.getItem("user")) {
      this.navigate("/");
      return;
    }

    const page = routes[path] || ErrorPage;
    this.root.innerHTML = page();
  }

  navigate(path) {
    window.history.pushState({}, "", path);
    this.handleRoute();
  }
}

export default Router;
