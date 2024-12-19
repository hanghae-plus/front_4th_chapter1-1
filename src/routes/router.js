import "./event/eventHandler.js";

// 클로저 + 싱글톤 패턴
const RoutesSingleton = () => {
  // 싱글톤, 단 1개의 인스터가 될 라우츠 선언
  let instance;

  // 라우터 관련된 로직은 전체 프로그램에서 여러가지일 필요가 없으므로 하나만 적용
  const initializeRoutes = () => {
    return {
      routes: {},
      addRoute: () => {},
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

console.log(RoutesSingleton);
