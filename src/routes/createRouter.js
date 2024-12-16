import { path } from "../utils/const/path.js";

export class CreateRouter {
  constructor(routes) {
    this.routes = routes;
  }

  init() {
    this.popstateListener();
    this.linkEventListeners();
    this.navigate(window.location.pathname);
    Object.values(this.routes).forEach((route) => route.setRouter(this));
  }

  navigate(currentPath) {
    const template = this.routes[currentPath] || this.routes.error;

    // 프로필로 이동 시 로그인 정보가 없을 때 로그인 페이지로 리다이렉트
    if (currentPath === path.PROFILE) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!userInfo) {
        this.redirectionToLogin();
        this.pushHistoryState(path.LOGIN);
        return this.routes[path.LOGIN].render();
      }
    }

    this.pushHistoryState(currentPath);
    return template.render();
  }

  linkEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();

        const path = e.target.getAttribute("href");
        window.history.pushState({}, path, window.location.origin + path);
        this.navigate(path);
      }
    });
  }

  popstateListener() {
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname);
    });
  }

  redirectionToLogin() {
    window.history.pushState(
      {},
      path.LOGIN,
      window.location.origin + path.LOGIN,
    );
    this.navigate(path.LOGIN);
  }

  pushHistoryState(path) {
    window.history.pushState({}, path, window.location.origin + path);
  }
}
