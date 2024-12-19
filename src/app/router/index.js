class Router {
  static instance = null;
  routes;
  options;

  constructor(options) {
    // 옵션 설정
    this.options = options;
    // 라우트 맵 생성
    this.routes = new Map();
  }

  // Singleton 패턴 적용
  static getInstance(options) {
    if (!Router.instance && options) {
      Router.instance = new Router(options);
    }
    return Router.instance;
  }

  // 라우트 추가
  addRoute(route) {
    this.routes.set(route.path, route);
    console.log(this.routes);
  }

  // 라우트 이동
  navigate(path, replace = false) {
    // 현재 경로 가져오기 || 404 라우트 가져오기
    const route = this.routes.get(path) || this.routes.get("404");

    // 라우트가 없으면 종료 (방어 코드)
    if (!route) return;
    // 라우트 가드 확인
    if (route.guard) {
      const canActivate = route.guard(this);
      if (!canActivate) return;
    }

    // 라우트 이동 처리
    // hash 모드일 경우
    if (this.options.mode === "hash") {
      if (replace) {
        // url 완전히 변경
        window.location.replace(`#${path}`);
      } else {
        // 현재 url 해시 부분만 변경
        window.location.hash = path;
      }
    } else {
      if (replace) {
        // url 완전히 변경
        window.history.replaceState({}, "", path);
      } else {
        // url 히스토리 스택에 추가
        window.history.pushState({}, "", path);
      }
      this.render();
    }
  }

  // 라우트 렌더링
  render() {
    // 현재 경로 가져오기
    const path = this.getCurrentPath();
    // 현재 경로에 해당하는 라우트 가져오기
    const route = this.routes.get(path) || this.routes.get("404");

    // 라우트가 없으면 종료 (방어 코드)
    if (!route) return;

    if (route.guard) {
      const canActivate = route.guard(this);
      if (!canActivate) return;
    }

    // 라우트 컴포넌트 가져오기
    const content = route.component();
    // 루트 요소 초기화
    this.options.root.innerHTML = "";

    // 컴포넌트가 문자열이면 루트 요소에 컴포넌트 추가
    if (typeof content === "string") {
      this.options.root.innerHTML = content;
    } else {
      // 컴포넌트가 객체이면 루트 요소에 컴포넌트 추가
      this.options.root.appendChild(content);
    }
  }

  // 현재 경로 가져오기
  getCurrentPath() {
    if (this.options.mode === "hash") {
      return window.location.hash.slice(1) || "/";
    }
    return window.location.pathname;
  }

  // 뒤로 가기
  back() {
    window.history.back();
  }

  // 앞으로 가기
  forward() {
    window.history.forward();
  }

  // 초기화
  init() {
    // 히스토리 변경 시 렌더링
    window.addEventListener("popstate", () => this.render());
    // 해시 변경 시 렌더링
    window.addEventListener("hashchange", () => this.render());
    // 페이지 로드 시 렌더링
    window.addEventListener("load", () => this.render());

    this.render();
  }
}

export const createRouter = (options) => {
  return Router.getInstance(options);
};
