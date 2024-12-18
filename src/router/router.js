import Component from "../core/component";

class Router extends Component {
  static instance = null;

  constructor($target) {
    // Router를 싱글톤으로 관리
    if (Router.instance) {
      return Router.instance;
    }
    super($target);
    Router.instance = this;
  }

  // 특정 경로로 네비게이션 수행 (해시,히스토리 모두 지원)
  navigate = (to, isReplace = false) => {
    const currentHash = window.location.hash;

    // 해시 모드가 활성화되어 있으면 해시 경로로 변경
    if (currentHash !== "") to = "#" + to;

    // replace 또는 동일한 경로면 replaceState, 아니면 pushState
    if (isReplace || to === location.pathname) history.replaceState({}, "", to);
    else history.pushState({}, "", to);
  };

  init() {
    this.state = {
      routes: [],
    };
    this._trackRouteState();
  }

  // URL 변경 추적을 위한 이벤트 리스너 설정
  _trackRouteState() {
    window.addEventListener("popstate", () => {
      this.handleRoute();
    });

    window.addEventListener("hashchange", () => {
      this.handleRoute();
    });

    // pushState 이벤트 커스텀
    const originalPushState = window.history.pushState;
    window.history.pushState = function (state, title, url) {
      originalPushState.apply(this, arguments);
      window.dispatchEvent(
        new CustomEvent("pushState", { detail: { state, title, url } }),
      );
    };
    window.addEventListener("pushState", () => {
      this.handleRoute();
    });

    // replaceState 이벤트 커스텀
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (state, title, url) {
      originalReplaceState.apply(this, arguments);
      window.dispatchEvent(
        new CustomEvent("replaceState", { detail: { state, title, url } }),
      );
    };
    window.addEventListener("replaceState", () => {
      this.handleRoute();
    });
  }

  // 라우트 경로를 정규식 패턴으로 변환
  _compileRoutePattern(fragment) {
    const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`^(?:#)?${escaped}$`);
  }

  // 라우트 추가 (fragment, page, guard, redirect)
  addRoute(fragment, page, guard = null, redirect = null) {
    const pattern = this._compileRoutePattern(fragment);

    // 중복된 라우트 제거 후 신규 라우트 등록
    if (this.state.routes.some((route) => route.fragment === fragment)) {
      this.state.routes = this.state.routes.filter(
        (routeObj) => routeObj.fragment !== fragment,
      );
    }

    this.state.routes.push({ fragment, pattern, page, guard, redirect });
  }

  // 현재 경로에 따른 라우트 매칭 및 렌더링 처리
  handleRoute() {
    const hash = window.location.hash;
    const fragment = window.location.pathname;

    // 해시 또는 pathname을 사용하여 현재 경로 결정
    const currentPath = hash !== "" ? hash : fragment;

    // 정규식 패턴 매칭을 통한 라우트 검색
    const currentRoute = this.state.routes.find((route) =>
      route.pattern.test(currentPath),
    );

    // 매칭되는 라우트가 없으면 에러 핸들링
    if (!currentRoute) {
      this._handleError();
      return;
    }

    // 가드 함수 실행: 실패 시 redirect 처리
    if (currentRoute.guard && !currentRoute.guard()) {
      if (!currentRoute.redirect) {
        this._handleError();
      }
      this.navigate(currentRoute.redirect, true);
      return;
    }

    // 매칭 라우트의 페이지 렌더링
    currentRoute.page().render();
  }

  // 에러 라우트로 처리
  _handleError() {
    const errorRoute = this.state.routes.find(
      (route) => route.fragment === "/error",
    );
    errorRoute.page().render();
  }
}

export default Router;
