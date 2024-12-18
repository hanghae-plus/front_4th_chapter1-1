import { ErrorPage } from "../components/pages/ErrorPage";
import { LoginPage } from "../components/pages/LoginPage";
import { MainPage } from "../components/pages/MainPage";
import { ProfilePage } from "../components/pages/ProfilePage";
import { state, subscribe } from "../store/store";
import { initLogin } from "./../events/login";
import { initProfile } from "./../events/profile";
import { initNavigation } from "./../events/navigation";

const routes = {
  "/": { page: MainPage, init: initNavigation },
  "/login": { page: LoginPage, init: initLogin },
  "/profile": { page: ProfilePage, init: initProfile },
};

export const router = () => {
  const root = document.getElementById("root");
  if (!root) return;

  const path = window.location.pathname;
  const route = routes[path] || { page: ErrorPage };

  // 비로그인 사용자는 프로필 접근 불가 → 로그인 페이지로 이동
  if (!state.user && path === "/profile") {
    root.innerHTML = LoginPage();
    return;
  }

  // 로그인 사용자는 로그인 페이지 접근 불가 → 메인 페이지로 이동
  if (state.user && path === "/login") {
    root.innerHTML = MainPage();
    return;
  }

  // 페이지 렌더링
  root.innerHTML = route.page(state.user);

  // 페이지 초기화 함수 실행
  if (route.init) {
    route.init();
  }
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

// 상태 변경 시 라우터 재실행
subscribe(() => {
  router();
});
