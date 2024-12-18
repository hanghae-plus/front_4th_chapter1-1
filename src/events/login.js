import { ROUTES } from "../constants/routes.js";
import { navigateTo } from "../router/router.js";
import { setState } from "../store/store.js";
import { setStorage } from "../utils/storageHandler.js";

export const handleLogin = () => {
  const username = document.getElementById("username")?.value || "";

  const userInfo = { username, email: "", bio: "" };

  if (username) {
    setState({ user: userInfo }); // 상태 업데이트

    setStorage("user", userInfo);

    navigateTo(ROUTES.HOME);
  } else {
    alert("아이디 혹은 비밀번호를 확인해주세요.");
  }
};

export const initLogin = () => {
  document.body.addEventListener("submit", (e) => {
    e.preventDefault();

    // login-form을 정확히 찾기 위해 closest 사용
    const loginForm = e.target.closest("#login-form");
    if (!loginForm) return;

    handleLogin();
  });
};
