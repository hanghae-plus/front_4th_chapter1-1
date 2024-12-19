import Router from "../router/Router";
import { setLocalStorage, removeLocalStorage } from "./storage";

const { navigateTo } = Router();
export function loginAction() {
  const userId = document.getElementById("username").value;
  setLocalStorage(
    "user",
    JSON.stringify({ username: userId, email: "", bio: "" }),
  );
  navigateTo("/profile");
}

export function profileAction() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;
  setLocalStorage("user", JSON.stringify({ username, email, bio }));
  alert("프로필이 업데이트되었습니다.");
}

export function logoutAction(e) {
  e.preventDefault();
  removeLocalStorage("user");
  navigateTo("/login");
}

export function navAction(e) {
  if (e.target.id === "logout") {
    logoutAction(e);
    return;
  }
  if (e.target.tagName === "A") {
    e.preventDefault();
    navigateTo(e.target.pathname);
  }
}

export function submitAction(e) {
  e.preventDefault();
  const form = e.target.closest("form");
  if (form.id === "login-form") loginAction();
  if (form.id === "profile-form") profileAction();
}
