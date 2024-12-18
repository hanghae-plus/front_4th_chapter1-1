import createBindings from "./bindings";
import createPageFactory from "./pages";
import { loginGuard, profileGuard } from "./router/guards";
import Router from "./router/router";
import { ROUTES } from "./router/routes";

const $app = document.querySelector("#root");

createBindings($app);

// 페이지 인스턴스 생성
const pages = createPageFactory($app);

// 라우터 초기화
const router = new Router($app);

// 라우트 등록
router.addRoute(ROUTES.MAIN, pages.main);
router.addRoute(ROUTES.PROFILE, pages.profile, profileGuard, "/login");
router.addRoute(ROUTES.LOGIN, pages.login, loginGuard, "/");
router.addRoute(ROUTES.ERROR, pages.error);

router.handleRoute();
