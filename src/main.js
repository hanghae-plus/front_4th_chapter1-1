import { router } from "./router/router.js";
import { setState } from "./store/store.js";

document.addEventListener("DOMContentLoaded", () => {
  // 테스트 환경에서 #root 보장
  if (!document.getElementById("root")) {
    const rootDiv = document.createElement("div");
    rootDiv.id = "root";
    document.body.appendChild(rootDiv);
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    setState({ user });
  }

  router(); // 초기 렌더링
});

window.addEventListener("popstate", router);
