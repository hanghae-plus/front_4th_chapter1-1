export default class Router {
  constructor() {
    this.routes = {}; // 라우트와 그에 대응하는 핸들러를 저장
    this.isHistory = false;

    if (window.location.hash) {
      this.isHistory = false;
    } else {
      this.isHistory = true;
    }

    this.init();
  }

  init() {
    if (this.isHistory) {
      window.addEventListener("popstate", this.handleState.bind(this)); // 뒤로 가기, 앞으로 가기 이벤트 처리
      this.handleRoute(window.location.pathname); // 페이지가 처음 로드될 때 경로 처리
    } else {
      window.addEventListener("hashchange", this.handleState.bind(this)); // 해시 변화 이벤트 처리
      this.handleRoute(window.location.hash); // 페이지가 처음 로드될 때 해시 처리
    }
  }

  cleanHash(hash) {
    return hash.startsWith("#/") ? hash.slice(1) : hash.slice(1); // #/로 시작하는 경우 슬래시를 처리
  }

  // 라우트를 라우터에 추가하는 메서드
  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  // 새로운 경로로 네비게이션하는 메서드
  navigateTo(path) {
    if (this.isHistory) {
      history.pushState(null, "", path); // URL을 브라우저 히스토리에 추가
    } else {
      // window.location.hash = `#/`; // 해시에서는 다른 방식 사용 (바로 path 넣기)
      console.log(path);
    }

    this.handleRoute(window.location.hash); // 새로운 경로에 대해 핸들러 호출
  }

  // popstate 이벤트 처리 (뒤로 가기/앞으로 가기)
  handleState() {
    const path = this.cleanHash(window.location.hash);
    // const path = this.isHistory ? window.location.pathname : window.location.hash.slice(1)
    this.handleRoute(path); // 현재 경로에 대해 처리
  }

  // 메인 라우트 처리 메서드
  handleRoute(path) {
    console.log(path);
    let handler = this.routes[path] || this.routes["/404"];
    if (handler) {
      handler(); // 핸들러가 있으면 실행
    } else {
      this.routes["/404"]; // path 가 비어있다면 핸들러가 없을테니 에러 페이지 로드
    }
  }
}
