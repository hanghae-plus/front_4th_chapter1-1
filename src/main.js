import createPageFactory from "./pages";
import Router from "./router/router";

// document.addEventListener("DOMContentLoaded", () => {
//   const $app = document.querySelector("#root");

//   // 페이지 인스턴스 생성
//   const pages = createPageFactory($app);

//   console.log("init");

//   // 라우터 초기화
//   const router = new Router($app);
//   router.addRoute("/", pages.main);
//   router.addRoute("/profile", pages.profile);
//   router.addRoute("/login", pages.login);
//   router.addRoute("/error", pages.error);
//   router.handleRoute();
// });

const $app = document.querySelector("#root");

// 페이지 인스턴스 생성
const pages = createPageFactory($app);

// 라우터 초기화
const router = new Router($app);
router.addRoute("/", pages.main);
router.addRoute("/profile", pages.profile);
router.addRoute("/login", pages.login);
router.addRoute("/error", pages.error);
router.handleRoute();
