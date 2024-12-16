import { ErrorPage } from "../components/pages/ErrorPage";
import { LoginPage } from "../components/pages/LoginPage";
import { MainPage } from "../components/pages/MainPage";
import { ProfilePage } from "../components/pages/ProfilePage";
import { state, subscribe } from "../store/store";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

export const router = () => {
  const path = window.location.pathname;
  const render = routes[path] || ErrorPage;

  if (!state.user && path === "/profile") {
    document.body.innerHTML = LoginPage();
    return;
  }

  document.body.innerHTML = render(render === LoginPage ? null : state.user);
};

// 상태 변경 시 router를 다시 실행해 렌더링
subscribe(() => {
  console.log("상태변경!!");
  router();
});
