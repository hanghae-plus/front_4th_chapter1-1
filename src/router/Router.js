import ErrorPage from "../page/ErrorPage";

class Router {
  constructor() {
    this.root = document.querySelector("#root");
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  /**
   * routes 경로 추가
   */
  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  /**
   * history 상태 추가
   */
  navigateTo(path, state = null) {
    history.pushState(state, "", path);
    this.handleRoute(path);
  }

  replaceTo(path, state = null) {
    history.replaceState(state, "", path);
    this.handleRoute(path);
  }

  /**
   * popstate 이벤트 발생시 호출
   * handleRoute를 통해 페이지 랜더링 진행
   */
  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  /**
   * routes의 path key를 가진 handler 를 실행하는 함수
   * path를 가지고 있으면 handler 를 실행
   * 없으면 ErrorPage 를 호출
   *
   * 문제점 : nav가 계속 변경되는 현상에서 addEventListener 오류가 발생
   * HTML 을 새로 랜더링 할때마다 새롭게 이벤트를 등록
   */
  handleRoute(path) {
    const handler = this.routes[path];

    if (handler) {
      handler.render();
    } else {
      this.root.innerHTML = `${ErrorPage()}`;
    }

    if (document.querySelector("nav")) {
      document.querySelector("nav").addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          e.preventDefault();
          router.navigateTo(e.target.pathname);
        }
      });
    }
  }
}

const router = new Router();

export default router;
