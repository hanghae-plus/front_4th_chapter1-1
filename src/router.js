import { ErrorPage } from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";

const routers = {
  //1. 함수를 실행하면 안되는 이유
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

// const routes = [
//   { path: "/", component: MainPage },
//   { path: "/login", component: LoginPage },
//   { path: "/profile", component: ProfilePage },
// ];

const router = () => {
  const path = window.location.pathname;

  //2. 즉시 실행 안하면 안되는 이유
  const render = (routers[path] || ErrorPage)();
  //   const render = routers[path] || ErrorPage();

  //   const potentialMatches = routes.map((route) => {
  //     return {
  //       route: route,
  //       isMatch: path === route.path,
  //     };
  //   });

  //   const match = potentialMatches.find(
  //     (potentialMatch) => potentialMatch.isMatch,
  //   );

  const app = document.getElementById("root");

  //   if (!match) {
  //     app.innerHTML = ErrorPage();
  //     return;
  //   }

  app.innerHTML = render;
};

const navigate = (event) => {
  event.preventDefault();

  const href = event.target.getAttribute("href");

  //history.pushState(state, title, url);
  //state: 상태 객체로, 브라우저 세션 기록 스택에 저장될 데이터입니다.

  console.log("href", href);

  if (href) {
    window.history.pushState({}, "", href); //주소 변경
    router(); //렌더링
  }
};

const initRouter = () => {
  window.addEventListener("popstate", router); //뒤로가기, 앞으로가기

  document.addEventListener("click", (event) => {
    console.log("event", event.target);
    if (event.target.matches("[data-link]")) {
      navigate(event);
    }
  });

  router();
};

initRouter();
