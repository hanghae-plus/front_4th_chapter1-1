import { router } from "./router/router.js";
import { initEvents } from "./events/index.js";
import { setState } from "./store/store.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    setState({ user });
  }

  router(); // 초기 렌더링
  initEvents();
});

window.addEventListener("popstate", router);
