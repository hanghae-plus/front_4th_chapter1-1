import ErrorPage from "../page/error";

class Router {
  constructor(routerMap, routerGuard) {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = this;
    this.currentPage = null;
    this.routerMap = { error: ErrorPage, ...routerMap };
    this.routerGuard = routerGuard;
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }
  renderPage(path) {
    const guardPath = this.routerGuard(path);
    const root = $("#root");

    const route = this.routerMap[guardPath] || null;

    if (path !== guardPath) {
      history.pushState(null, null, guardPath);
    }

    if (!route) {
      root.innerHTML = ErrorPage().template;
      return;
    }

    root.innerHTML = this.routerMap[guardPath].component().template;
    this.currentPage = this.routerMap[guardPath].component();
  }
  push(path) {
    const guardPath = this.routerGuard(path);
    history.pushState(null, null, guardPath);
    this.renderPage(guardPath);
  }
  handlePopState() {
    this.renderPage(window.location.pathname);
  }
}

class HashRouter {
  constructor(routerMap, routerGuard) {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = this;
    this.currentPage = null;
    this.routerMap = { error: ErrorPage, ...routerMap };
    this.routerGuard = routerGuard;

    // hashchange 이벤트로 라우팅
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
  }

  getCurrentPath() {
    // location.hash에서 '#'을 제거하고 경로를 추출
    const hash = window.location.hash || "#/";
    const path = hash.replace(/^#/, "");
    return path === "" ? "/" : path;
  }

  renderPage(path) {
    const guardPath = this.routerGuard(path);
    const root = document.querySelector("#root");

    if (path !== guardPath) {
      // 가드에 의해 변경된 경로를 hash로 설정
      window.location.hash = guardPath;
    }

    const route = this.routerMap[guardPath] || null;

    if (!route) {
      root.innerHTML = ErrorPage().template;
      this.currentPage = ErrorPage();
      return;
    }

    const pageComponent = route.component();
    root.innerHTML = pageComponent.template;
    this.currentPage = pageComponent;
  }

  push(path) {
    const guardPath = this.routerGuard(path);
    // hash를 변경 -> hashchange 이벤트 발생 -> renderPage 호출
    window.location.hash = guardPath;
  }

  replace(path) {
    const guardPath = this.routerGuard(path);
    // replace 동작을 hash 기반으로 "유사"하게 구현
    // location.replace를 사용하여 현재 페이지를 변경
    // pathname 뒤에 #를 붙여 완전한 URL로 치환
    location.replace(location.origin + location.pathname + "#" + guardPath);
  }

  handleHashChange() {
    const path = this.getCurrentPath();
    this.renderPage(path);
  }
}

export { HashRouter };
export default Router;
