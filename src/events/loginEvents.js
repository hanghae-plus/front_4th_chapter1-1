import { navigateTo } from "../router/router.js";
import { saveLocalStorage } from "../storage/storage.js";
import { PATHS } from "../router/routes.js";

export const loginEvents = () => {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("username");
  const passwordInput = document.getElementById("passwordInput");

  // 로그인
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (validateForm(email, password)) {
      saveLocalStorage("user", { username: email, email: "", bio: "" });
      navigateTo(PATHS.PROFILE);
    }
  });

  // 유효성 검사
  const validateForm = (email) => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      emailInput.focus();
      return false;
    }
    return true;
  };
};
