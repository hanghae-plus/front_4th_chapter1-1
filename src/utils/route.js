export class HistoryRouter {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    if (event && event.isPropagationStopped?.()) {
      return;
    }
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  // 메인 라우트 처리 메서드
  handleRoute(path) {
    let handler = this.routes[path] || this.routes["/404"];
    if (handler) {
      handler(); // 핸들러가 있으면 실행
    } else {
      this.routes["/404"];
    }
  }
}

export class HashRouter {
  constructor() {
    this.routes = {};
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
  }

  // 라우트 등록
  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  // 새로운 경로로 네비게이션
  navigateTo(path) {
    window.location.hash = `${path}`;
    this.handleRoute(path);
  }

  handleHashChange() {
    const path = window.location.hash.slice(1);
    this.handleRoute(path);
  }

  handleRoute(path) {
    const handler = this.routes[path] || this.routes["/404"];
    if (handler) {
      handler();
    } else {
      this.routes["/404"];
    }
  }
}

export function navbarEventController(router) {
  const navbar = document.querySelector("nav");
  if (navbar) {
    navbar.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const path = e.target.getAttribute("href");
        router.navigateTo(path);
      }
    });
  }
}
