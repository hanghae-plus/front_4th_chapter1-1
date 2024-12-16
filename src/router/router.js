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

  // 페이지 이동 함수
  navigate = (to, isReplace = false) => {
    // URL 변경에 대한 커스텀 이벤트 정의
    const historyChangeEvent = new CustomEvent("historychange", {
      detail: {
        to,
        isReplace,
      },
    });

    dispatchEvent(historyChangeEvent);
  };

  init() {
    this.state = {
      routes: [],
    };

    // URL 변경에 따른 커스텀 이벤트 리스너
    window.addEventListener("historychange", this.handleHistory.bind(this));
    // 뒤로가기 이벤트에 대한 리스너
    window.addEventListener("popstate", this.handleRoute.bind(this));
  }

  // 라우트 추가
  addRoute(fragment, page) {
    // 기존 라우트와 중복되는 라우트 무시 처리
    if (this.state.routes.some((route) => route.fragment === fragment)) {
      return;
    }

    this.state.routes.push({ fragment, page });
  }

  // 히스토리 관리
  handleHistory({ detail }) {
    const { to, isReplace } = detail;

    // 페이지 교체 혹은 중복 페이지 방지
    if (isReplace || to === location.pathname)
      history.replaceState(null, "", to);
    else history.pushState(null, "", to);

    this.handleRoute();
  }

  // 라우트 예외처리 및 렌더링
  handleRoute() {
    // 현재 라우트를 기준으로 페이지 추출
    const fragment = window.location.pathname;
    const currentRoute = this.state.routes.find(
      (route) => route.fragment === fragment,
    );

    if (!currentRoute) {
      this.handleError();
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
