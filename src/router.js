export default class Router {
  #routes = {};
  #guard = null;
  constructor(routes) {
    this.#routes = routes;
    this.init();
  }

  navigate(path) {
    const root = document.getElementById("root");

    if (this.#guard) {
      const canNavigate = this.#guard(path);
      if (!canNavigate) return;
    }

    const render = this.#routes[path] || this.#routes["/404"];
    root.innerHTML = render();
  }

  init() {
    const path = window.location.pathname;
    history.replaceState(null, "", path);
    this.navigate(path);

    // a 태그 새로고침 방지 및 라우팅 처리
    document.body.addEventListener("click", (e) => {
      const target = e.target.closest("a");
      if (target) {
        e.preventDefault(); // 기본 동작 차단
        const path = target.getAttribute("href");
        history.pushState(null, "", path);
        this.navigate(path);
      }
    });

    // popstate 이벤트 처리(뒤로가기, 앞으로가기)
    window.addEventListener("popstate", () => {
      const path = window.location.pathname;
      this.navigate(path);
    });
  }

  beforeEnter(callback) {
    this.#guard = callback;
  }
}
