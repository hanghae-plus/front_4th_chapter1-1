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
    const currentHash = window.location.hash;

    // 해시가 존재하면 해시 기반으로 이동, 없으면 히스토리 기반으로 이동
    if (currentHash !== "") to = "#" + to;

    if (isReplace || to === location.pathname) history.replaceState({}, "", to);
    else history.pushState({}, "", to);
  };

  init() {
    this.state = {
      routes: [],
    };
    this._trackRouteState();
  }

  // 페이지 URL 변경 추적 이벤트 생성 및 리스너 등록
  _trackRouteState() {
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

  // 라우트 문자열을 정규식 패턴으로 컴파일
  _compileRoutePattern(fragment) {
    const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`^(?:#)?${escaped}$`);
  }

  // 라우트 추가
  addRoute(fragment, page, guard = null, redirect = null) {
    const pattern = this._compileRoutePattern(fragment);

    // 기존 라우트와 중복되는 라우트는 신규 라우트로 대체
    if (this.state.routes.some((route) => route.fragment === fragment)) {
      this.state.routes = this.state.routes.filter(
        (routeObj) => routeObj.fragment !== fragment,
      );
    }

    this.state.routes.push({ fragment, pattern, page, guard, redirect });
  }

  // 라우트 예외처리 및 렌더링
  handleRoute() {
    const hash = window.location.hash;
    const fragment = window.location.pathname;

    // 해시가 있으면 해시를 사용, 없으면 pathname 사용
    const currentPath = hash !== "" ? hash : fragment;

    // 라우트 매칭
    const currentRoute = this.state.routes.find((route) =>
      route.pattern.test(currentPath),
    );

    if (!currentRoute) {
      this._handleError();
      return;
    }

    // 라우트 가드가 있는 경우 실행
    if (currentRoute.guard && !currentRoute.guard()) {
      if (!currentRoute.redirect) {
        this._handleError();
      }
      this.navigate(currentRoute.redirect, true);
      return;
    }

    // 추출된 페이지 렌더링
    currentRoute.page().render();
  }

  // 에러 핸들링
  _handleError() {
    const errorRoute = this.state.routes.find(
      (route) => route.fragment === "/error",
    );

    errorRoute.page().render();
  }
}

export default Router;
