import { path } from "../utils/const/path.js";

export class CreateRouter {
  constructor(routes) {
    this.routes = routes;
  }

  init() {
    this.popstateListener();
    this.linkEventListeners();
    this.navigate(window.location.pathname);
  }

  navigate(currentPath) {
    const template = this.routes[currentPath] || this.routes.error;

    // 프로필로 이동 시 로그인 정보가 없을 때 로그인 페이지로 리다이렉트
    if (currentPath === path.PROFILE) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!userInfo) {
        this.redirectionToLogin();
        return this.routes[path.LOGIN].render();
      }
    }

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
}
