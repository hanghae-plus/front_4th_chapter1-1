import Component from "../core/component";

class Router extends Component {
  init() {
    this.state = {
      routes: [],
    };
    document.body.addEventListener("click", this.onClickLink.bind(this));
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

  navigateTo(url) {
    history.pushState(null, null, url);
    this.handleRoute();
  }

  handleRoute() {
    const fragment = window.location.pathname;
    const currentRoute = this.state.routes.find(
      (route) => route.fragment === fragment,
    );

    if (!currentRoute) {
      this.handleError();
      return;
    }

    currentRoute.page();
  }

  handleError() {
    const errorRoute = this.state.routes.find(
      (route) => route.fragment === "/error",
    );

    errorRoute.page();
  }

  onClickLink(e) {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      this.navigateTo(e.target.href);
    }
  }
}

export default Router;
