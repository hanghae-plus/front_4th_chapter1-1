import { router } from "./router/router.js";
import { setState } from "./store/store.js";
import { getStorage } from "./utils/storageHandler.js";

// 브라우저 라우터
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(getStorage("user"));
  if (user) setState({ user });
  router(); // 초기 렌더링
});

// 해시 라우터
window.addEventListener("hashchange", () => {
  const user = JSON.parse(getStorage("user"));
  if (user) setState({ user });
  router();
});

// 뒤로가기, 앞으로가기
window.addEventListener("popstate", router);
