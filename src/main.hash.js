import { navigateTo, resolveRoute } from "./router.js";

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout") {
    e.preventDefault();
    localStorage.clear();
    navigateTo("/login");
  }
});

// 이벤트 초기화
const initializeRouter = () => {
  window.addEventListener("hashchange", () => resolveRoute(true));
  window.addEventListener("load", () => resolveRoute(true));
};

// 라우터 초기화 호출
initializeRouter();
