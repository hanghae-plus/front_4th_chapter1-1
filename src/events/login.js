import { router } from "../router/router.js";
import { setState } from "../store/store.js";

export const handleLogin = (e) => {
  e.preventDefault();

  const id = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const userInfo = { username: "testuser", email: "", bio: "" };

  if (id && password) {
    setState({ user: userInfo }); // 상태 업데이트

    localStorage.setItem("user", JSON.stringify(userInfo));
    history.pushState({}, "", "/");
    router();
  } else {
    alert("아이디 혹은 비밀번호를 확인해주세요.");
  }
};

export const handleLogOut = (e) => {
  const clickedElement = e.target.closest("#logout");

  if (clickedElement) {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      setState({ user: null }); // 상태 초기화

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
