import { ErrorPage } from "./pages/ErrorPage";
import {
  addUserInfo,
  checkUserInfo,
  deleteUserInfo,
  LoginPage,
} from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { handleProfileSubmit, ProfilePage } from "./pages/ProfilePage";

const routers = {
  //1. 함수를 실행하면 안되는 이유
  //라우팅 상태에 따라 동적으로 컴포넌트를 호출하는 대신, 고정된 값(초기 렌더링 결과)만 사용할 수 있게 됩니다.
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

export const render = () => {
  const path = window.location.pathname;

  //2. 즉시 실행 안하면 안되는 이유
  //현재 경로에 해당하는 컴포넌트를 호출하여 렌더링해야 하기 때문
  const render = (routers[path] || ErrorPage)();

  const app = document.getElementById("root");

  app.innerHTML = render;
};

export const router = () => {
  const path = window.location.pathname;

  render();

  if (path === "/login") {
    addUserInfo();
  }

  if (path === "/") {
    deleteUserInfo();
  }

  if (path === "/profile") {
    if (checkUserInfo()) {
      deleteUserInfo();

      handleProfileSubmit();
    }

    if (!checkUserInfo()) {
      window.history.pushState({}, "", "/login");

      render();
    }
  }
};

const initRouter = () => {
  window.addEventListener("popstate", router); //뒤로가기, 앞으로가기

  router();
};

initRouter();
