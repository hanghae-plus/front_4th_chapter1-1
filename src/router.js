import { MainPage } from "./pages/mainPage.js";
import { loginHandles, LoginPage } from "./pages/loginPage.js";
import { ProfilePage } from "./pages/profilePage.js";
import { ErrorPage } from "./pages/errorPage.js";

// 초기 URL 모드
let isHashMode = false;

// 링크 이벤트 처리
document.addEventListener("click", (e) => {
  const target = e.target.closest("a");
  if (target) {
    e.preventDefault();
    e.stopPropagation();
    const href = target.getAttribute("href");
    if (href) {
      navigateTo(href);
    }
  }
});

const Routes = {
  "/": () => MainPage(),
  "/login": () => LoginPage(),
  "/profile": () => ProfilePage(),
};

// 현재 경로 계산
const getCurrentPath = () => {
  if (isHashMode) {
    const hash = window.location.hash.slice(1); // # 제거
    return hash || "/";
  } else {
    return window.location.pathname;
  }
};

// 공통 라우팅 처리
export const resolveRoute = (isHash = false) => {
  isHashMode = isHash;
  const path = getCurrentPath();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const root = document.getElementById("root");

  // 인증 경로 가드
  if (path === "/profile" && user === null) {
    navigateTo("/login");
    return;
  }
  if (path === "/login" && user !== null) {
    navigateTo("/");
    return;
  }

  const route = Routes[path];

  if (route) {
    root.innerHTML = route();
  } else {
    root.innerHTML = ErrorPage();
  }

  // 로그인 이벤트 핸들러 추가
  if (path === "/login") {
    loginHandles();
  }
};

// 페이지 이동 함수
export const navigateTo = (path) => {
  if (isHashMode) {
    window.location.hash = `#${path}`;
  } else {
    window.history.pushState(null, null, path);
  }
  resolveRoute(isHashMode);
};
