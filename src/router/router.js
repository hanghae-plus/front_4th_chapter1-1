import Component from "../core/component";

class Router extends Component {
  static instance = null;

  constructor($target) {
    // 라우터 싱글톤(Singleton) 인스턴스
    if (Router.instance) {
      return Router.instance;
    }
    super($target);
    Router.instance = this;
  }

  navigate = (to, isReplace = false) => {
    const hash = window.location.hash;
    if (hash !== "") to = "#" + to;
    // 페이지 교체 혹은 중복 페이지 방지
    if (isReplace || to === location.pathname) history.replaceState({}, "", to);
    else history.pushState({}, "", to);
  };

  init() {
    this.state = {
      routes: [],
    };

    this.trackRouteState();
  }

  // 페이지 URL 변경 추적 이벤트 생성 및 리스너 등록
  trackRouteState() {
    window.addEventListener("popstate", () => {
      this.handleRoute();
    });

    window.addEventListener("hashchange", () => {
      this.handleRoute();
    });

    const originalPushState = window.history.pushState;
    window.history.pushState = function (state, title, url) {
      originalPushState.apply(this, arguments);
      const event = new CustomEvent("pushState", {
        detail: { state, title, url },
      });
      window.dispatchEvent(event);
    };

    window.addEventListener("pushState", () => {
      this.handleRoute();
    });

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (state, title, url) {
      originalReplaceState.apply(this, arguments);
      const event = new CustomEvent("replaceState", {
        detail: { state, title, url },
      });
      window.dispatchEvent(event);
    };

    window.addEventListener("replaceState", () => {
      this.handleRoute();
    });
  }

  // 라우트 추가
  addRoute(fragment, page, guard = null, redirect = null) {
    // 기존 라우트와 중복되는 라우트는 신규 라우트로 대체
    if (this.state.routes.some((route) => route.fragment === fragment)) {
      this.state.routes = this.state.routes.filter(
        (routeObj) => routeObj.fragment !== fragment,
      );
    }

    this.state.routes.push({ fragment, page, guard, redirect });
  }

  // 라우트 예외처리 및 렌더링
  handleRoute() {
    // 현재 라우트를 기준으로 페이지 추출
    const hash = window.location.hash;
    const fragment = window.location.pathname;

    const pathname = hash !== "" ? hash : fragment;

    const currentRoute = this.state.routes.find(
      (route) => route.fragment === pathname,
    );

    if (!currentRoute) {
      this.handleError();
      return;
    }

    // 라우트 가드가 있는 경우 실행
    if (currentRoute.guard && !currentRoute.guard()) {
      this.navigate(currentRoute.redirect, true);
      return;
    }

    // 추출된 페이지 렌더링
    currentRoute.page().render();
  }

  // 에러 핸들링
  handleError() {
    const errorRoute = this.state.routes.find(
      (route) => route.fragment === "/error",
    );

    errorRoute.page().render();
  }
}

export default Router;
