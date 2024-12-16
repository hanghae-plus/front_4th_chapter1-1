import { routes } from "../routes";

// src/app/router/lib/navigate.ts
function navigate(to, replace = false) {
  if (replace) {
    window.history.replaceState({}, "", to);
  } else {
    window.history.pushState({}, "", to);
  }

  // 즉시 라우팅 처리를 위한 함수
  const handleRouteChange = () => {
    const rootElement = document.getElementById("root"); // root element ID 가정
    const route = routes[to] || routes[404];

    rootElement.innerHTML = "";
    rootElement.innerHTML = route();
  };

  handleRouteChange(); // 즉시 라우팅 처리
  window.dispatchEvent(new Event("pushstate")); // 이벤트는 유지 (다른 리스너를 위해)
}

export { navigate };
