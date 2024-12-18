import { router } from "./router/router.js";
import { setState } from "./store/store.js";
import { getStorage } from "./utils/storageHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(getStorage("user"));

  if (user) {
    setState({ user });
  }

  router(); // 초기 렌더링
});

window.addEventListener("popstate", router);
