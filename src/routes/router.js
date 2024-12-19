import "./event/eventHandler.js";

// 클로저 + 싱글톤 패턴
const RoutesSingleton = () => {
  // 싱글톤, 단 1개의 인스터가 될 라우츠 선언
  let instance;

  // 라우터 관련된 로직은 전체 프로그램에서 여러가지일 필요가 없으므로 하나만 적용
  // 여기서 다시한번 클로저, 싱글톤 패턴 이용
  const initializeRoutes = () => {
    // 캡슐화
    const routes = {};

    // 라우트 추가 함수
    const addRoute = (path, handler) => {
      routes[path] = handler;
    };

    // 라우터에 걸려있는 이벤트 처리
    const handleRoute = (path) => {
      const handler = routes[path];
      if (handler) {
        handler();
        return;
      }
      // TODO: 에러처리
      console.log("404 Not Found");
    };

    // popstate 이벤트 처리
    const handlePopState = () => {
      handleRoute(window.location.pathname);
    };

    // 브라우저 navigate 이벤트 처리
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

  // 싱글톤 인스턴스 반환 함수
  const getInstance = () => {
    if (!instance) {
      instance = initializeRoutes();
    }
    return instance;
  };

  return {
    getInstance,
  };
};

export const createRoutes = () => {
  const { getInstance } = RoutesSingleton();
  return getInstance();
};
