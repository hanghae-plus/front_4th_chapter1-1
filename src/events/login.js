import { router } from "../router/router.js";

export const handleLogin = () => {
  if (localStorage.getItem("user")) {
    localStorage.clear(); // 있을 경우 localStorage 비워주기(로그아웃이랑 url 같아서 구분 위해)
    return;
  }

  const id = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const userInfo = { username: "testuser", email: "", bio: "" };

  if (id && password) {
    history.pushState({}, "", "/");
    router();
    localStorage.setItem("user", JSON.stringify(userInfo));
  } else {
    alert("아이디 혹은 비밀번호를 확인해주세요.");
  }
};

export const initLogin = () => {
  document.body.addEventListener("submit", handleLogin);
};
