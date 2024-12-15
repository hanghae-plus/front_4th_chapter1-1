import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

// 콘텐츠를 문서 본문에 로드하는 함수
const loadRoute = (content) => {
  document.body.innerHTML = content;
};

class Router {
  constructor() {
    this.routes = {}; // 라우트와 그에 대응하는 핸들러를 저장
    window.addEventListener("popstate", this.handlePopState.bind(this)); // 뒤로 가기, 앞으로 가기 이벤트 처리
    this.handleRoute(window.location.pathname); // 페이지가 처음 로드될 때 경로 처리
  }

  // 라우트를 라우터에 추가하는 메서드
  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  // 새로운 경로로 네비게이션하는 메서드
  navigateTo(path) {
    history.pushState(null, "", path); // URL을 브라우저 히스토리에 추가
    this.handleRoute(path); // 새로운 경로에 대해 핸들러 호출
  }

  // popstate 이벤트 처리 (뒤로 가기/앞으로 가기)
  handlePopState() {
    this.handleRoute(window.location.pathname); // 현재 경로에 대해 처리
  }

  // 메인 라우트 처리 메서드
  handleRoute(path) {
    const handler = this.routes[path]; // 해당 경로에 맞는 핸들러를 가져옴
    if (handler) {
      handler(); // 핸들러가 있으면 실행
    } else {
      loadRoute(ErrorPage()); // 핸들러가 없으면 에러 페이지 로드
    }
  }
}

// 라우터 초기화
const router = new Router();

// 경로와 그에 대응하는 핸들러 추가
router.addRoute("/", () => loadRoute(MainPage())); // 메인 페이지
router.addRoute("/profile", () => loadRoute(ProfilePage())); // 프로필 페이지
router.addRoute("/login", () => loadRoute(LoginPage())); // 로그인 페이지
router.addRoute("/404", () => loadRoute(ErrorPage())); // 에러 페이지

router.navigateTo(window.location.pathname);

// 네비게이션 링크 클릭 처리
document.querySelector("nav").addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault(); // 기본 링크 클릭 동작을 막음
    if (e.target.pathname !== window.location.pathname)
      router.navigateTo(e.target.pathname);
  }
});
