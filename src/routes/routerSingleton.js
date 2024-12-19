// routerSingleton.js
import { PagesNameEnum, PageToPathEnum } from "./shared/enum.js";

let instance = null;

// 라우터 초기화 함수
const initializeRoutes = () => {
  const routes = {};

  const addRoute = (path, handler) => {
    routes[path] = handler;
  };

  const handleRoute = (path) => {
    if (path === "#") return;

    const handler = routes[path];
    if (handler) {
      handler();
      return;
    }
    // 에러 처리
    navigateTo(PageToPathEnum[PagesNameEnum.ERROR]);
  };

  const handlePopState = () => {
    handleRoute(window.location.pathname);
  };

  const navigateTo = (path) => {
    window.history.pushState({}, path, path);
    handleRoute(path);
  };

  return {
    routes,
    addRoute,
    navigateTo,
    handleRoute,
    handlePopState,
  };
};

// 진정한 싱글톤 객체
const RoutesSingleton = {
  getInstance: () => {
    if (!instance) {
      instance = initializeRoutes();
    }
    return instance;
  },
};

export { RoutesSingleton };
