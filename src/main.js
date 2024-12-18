import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout";

import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "./utils/storage";

const routes = [
  { path: "/", view: MainPage() },
  { path: "/login", view: LoginPage() },
  { path: "/profile", view: ProfilePage() },
  { path: "/404", view: ErrorPage() },
];

async function router() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  if (!root) return;
  const userInfo = getLocalStorage("user");

  if (!userInfo && location.pathname === "/profile") {
    navigateTo("/login");
    return;
  }

  const potentialMatch = routes.find(
    (route) => route.path === location.pathname,
  );

  if (potentialMatch === undefined || location.hash) {
    navigateTo("/404");
    return;
  }

  const page = Layout(potentialMatch);

  root.innerHTML = page;
  if (location.pathname === "/profile") {
    document.getElementById("username").value = JSON.parse(userInfo).username;
    document.getElementById("email").value = JSON.parse(userInfo).email;
  }
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      removeLocalStorage("user");
    });
  }
}

function navigateTo(url, state = null) {
  history.pushState(state, "", url);
  router();
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target.closest("form");
  if (form.id === "login-form") loginAction();
  if (form.id === "profile-form") profileAction();
});

function loginAction() {
  const userId = document.getElementById("username").value;
  const pw = document.getElementById("password").value;
  setLocalStorage("userLoginInfo", JSON.stringify({ userId, pw }));
  setLocalStorage(
    "user",
    JSON.stringify({ username: userId, email: "", bio: "" }),
  );
  navigateTo("/profile");
}

function profileAction() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;
  setLocalStorage("user", JSON.stringify({ username, email, bio }));
  alert("프로필이 업데이트되었습니다.");
}
