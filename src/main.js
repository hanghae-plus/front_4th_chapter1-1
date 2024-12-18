import createBindings from "./bindings";
import createPageFactory from "./pages";
import Router from "./router/router";

const $app = document.querySelector("#root");

createBindings($app);

// 페이지 인스턴스 생성
const pages = createPageFactory($app);

// 라우터 초기화
const router = new Router($app);

// 히스토리 기반 라우트 등록
router.addRoute("/", pages.main);
router.addRoute("/profile", pages.profile);
router.addRoute("/login", pages.login);
router.addRoute("/error", pages.error);
// 해시 기반 라우트 등록
router.addRoute("#/", pages.main);
router.addRoute("#/profile", pages.profile);
router.addRoute("#/login", pages.login);
router.addRoute("#/error", pages.error);
router.handleRoute();
