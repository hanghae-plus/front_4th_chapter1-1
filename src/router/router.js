import { ErrorPage } from "../components/pages/ErrorPage";
import { LoginPage } from "../components/pages/LoginPage";
import { MainPage } from "../components/pages/MainPage";
import { ProfilePage } from "../components/pages/ProfilePage";
import { state, subscribe } from "../store/store";
import { initLogin } from "./../events/login";
import { initProfile } from "./../events/profile";
import { initNavigation } from "./../events/navigation";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

// UI 그려주기
export const router = () => {
  const path = window.location.pathname;
  const render = routes[path] || ErrorPage;

  if (!state.user && path === "/profile") {
    document.body.innerHTML = LoginPage();
    return;
  }

  document.body.innerHTML = render(render === LoginPage ? null : state.user);

  if (path === "/login") initLogin();
  else if (path === "/profile") initProfile();
  else if (path === "/") initNavigation();
};

// 상태 변경 시 router를 다시 실행해 렌더링
subscribe(() => {
  console.log("상태변경!!");
  router();
});
