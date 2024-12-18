import { resolveRoute } from "./router.js";

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout") {
    e.preventDefault();
    localStorage.clear();
  }
});

// 이벤트 초기화
const initializeRouter = () => {
  window.addEventListener("popstate", () => resolveRoute(false));
  window.addEventListener("load", () => resolveRoute(false));
};

// 라우터 초기화 호출
initializeRouter();
