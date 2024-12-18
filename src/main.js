import { MainPage } from "./pages/mainPage.js";
import { attachLoginHandler, LoginPage } from "./pages/loginPage.js";
import { ProfilePage } from "./pages/profilePage.js";
import { ErrorPage } from "./pages/errorPage.js";

// 로그아웃
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout") {
    e.preventDefault();
    localStorage.clear();
  }
});

// 링크 이벤트 처리
const routeHandlers = () => {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      navigateTo(href);
    });
  });
};

// 라우터 설정
const Routes = {
  "/": () => MainPage(),
  "/login": () => LoginPage(),
  "/profile": () => ProfilePage(),
};

// 초기 URL 모드 확인
const isHashMode = window.location.href.includes("index.hash.html");

// 현재 경로 계산
const getCurrentPath = () => {
  if (isHashMode) {
    const hash = window.location.hash.slice(1); // # 제거
    return hash || "/"; // 빈 해시인 경우 홈 경로로 설정
  } else {
    return window.location.pathname;
  }
};

// 공통 라우팅 처리
const resolveRoute = () => {
  const path = getCurrentPath();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const root = document.getElementById("root");

  // 인증된 사용자 경로 처리
  if (path === "/profile" && !user.username) {
    navigateTo("/login");
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
    attachLoginHandler();
  }
  // 링크 이벤트 처리
  routeHandlers();
};

// 페이지 이동 함수
export const navigateTo = (path) => {
  if (isHashMode) {
    window.location.hash = `#${path}`;
  } else {
    window.history.pushState(null, null, path);
  }
  resolveRoute();
};

// 이벤트 초기화
const initializeRouter = () => {
  if (isHashMode) {
    window.addEventListener("hashchange", resolveRoute);
  } else {
    window.addEventListener("popstate", resolveRoute);
  }
  window.addEventListener("load", resolveRoute);
};

// 라우터 초기화 호출
initializeRouter();
