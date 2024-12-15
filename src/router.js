import { ErrorPage } from "./pages/ErrorPage";
import { addUserInfo, checkUserInfo, LoginPage } from "./pages/LoginPage";
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

  app.innerHTML = render; //렌더링이 되고나서

  if (path === "/login") {
    addUserInfo(); //해당 함수 실행
  }
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

  const isValidLoggedIn = checkUserInfo();

  const currentPath = window.location.pathname;

  // console.log(window.history);
  //   if (isValidLoggedIn && !window.history.state) {
  //     console.log(window.history);
  //     window.history.pushState({}, "", "/"); //로그인이 되어있으면 바로 홈으로 리다이렉트
  //   } else {
  //     window.history.pushState({}, "", "/login"); //처음에 로그인 페이지로 이동
  //   }

  //   if (!window.history.state) {
  //     if (isValidLoggedIn) {
  //       window.history.replaceState({ isLoggedIn: true }, "", "/"); // 홈 페이지로 이동
  //     }
  //   } else {
  //     window.history.replaceState({ isLoggedIn: false }, "", "/login"); // 홈 페이지로 이동
  //   }

  //   if (isValidLoggedIn && currentPath !== "/") {
  //     //기타 다른 페이지는 허용해야 함
  //     // window.history.replaceState({ isLoggedIn: true }, "", "/");
  //   } else if (!isValidLoggedIn && currentPath !== "/login") {

  //   }

  if (!isValidLoggedIn && currentPath !== "/login")
    window.history.replaceState({ isLoggedIn: false }, "", "/login");

  document.addEventListener("click", (event) => {
    console.log("event", event.target);
    if (event.target.matches("[data-link]")) {
      navigate(event);
    }
  });

  router();
};

initRouter();
