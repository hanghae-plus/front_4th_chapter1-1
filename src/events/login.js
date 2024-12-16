import { router } from "../router/router.js";

export const handleLogin = () => {
  const loginBtn = document.querySelector("#login-form");

  if (loginBtn) {
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
  }
};

export const handleLogOut = (e) => {
  const clickedElement = e.target.closest("#logout");

  if (clickedElement) {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      history.pushState({}, "", "/login");
      router();
    }
  }
};

export const initLogin = () => {
  document.body.addEventListener("submit", handleLogin);
};

export const initLogOut = () => {
  document.body.addEventListener("click", handleLogOut);
};
