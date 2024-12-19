import Layout from "./components/Layout.js";
import ErrorPage from "./page/ErrorPage.js";
import LoginPage from "./page/LoginPage.js";
import HomePage from "./page/HomePage.js";
import ProfilePage from "./page/ProfilePage.js";
import {
  clearUserFromStorage,
  getFormValues,
  getUserFromStorage,
  isAuthenticated,
  saveUserToStorage,
  setFormValues,
} from "./utils/utils.js";

const $root = document.getElementById("root");

const hashRoutes = [
  { path: "#/", component: () => Layout(HomePage) },
  { path: "#/profile", component: () => Layout(ProfilePage) },
  { path: "#/login", component: () => LoginPage },
];
const routes = [
  { path: "/", component: () => Layout(HomePage) },
  { path: "/profile", component: () => Layout(ProfilePage) },
  { path: "/login", component: LoginPage },
];

const router = (path) => {
  let _path = path ?? window.location.pathname;

  if (_path === "/profile" && !isAuthenticated()) {
    _path = "/login";
  }
  if (_path === "/login" && isAuthenticated()) {
    _path = "/";
  }

  const route = routes.find((route) => route.path === _path);
  window.history.pushState(null, "", _path);

  if (route) {
    $root.innerHTML = route.component();
    if (_path === "/profile" && isAuthenticated()) {
      setProfile();
    }
  } else {
    $root.innerHTML = ErrorPage();
  }
};
const hashRouter = (path) => {
  let _path = path ?? window.location.hash;

  const routeName = _path.replace("#/", "");

  if (routeName === "profile" && !isAuthenticated()) {
    window.location.hash = "#/login";
    return;
  }
  if (routeName === "login" && isAuthenticated()) {
    window.location.hash = "#/";
    return;
  }

  const route = hashRoutes.find((route) => route.path === `#/${routeName}`);
  window.location.hash = `#/${routeName}`;

  if (route) {
    $root.innerHTML = route.component();
    if (routeName === "profile" && isAuthenticated()) {
      setProfile();
    }
  } else {
    $root.innerHTML = ErrorPage();
  }
};

export const setProfile = () => {
  const user = getUserFromStorage();
  const profileForm = document.getElementById("profile-form");

  setFormValues(profileForm, user);
};

const handleProfileUpdate = () => {
  const profileForm = document.getElementById("profile-form");
  const updatedUser = getFormValues(profileForm);

  saveUserToStorage(updatedUser);
};

const handleLogin = () => {
  const loginForm = document.getElementById("login-form");
  const username = loginForm.querySelector("#username").value;

  if (!username.trim()) return;

  localStorage.setItem(
    "user",
    JSON.stringify({
      username: username,
      email: "",
      bio: "",
    }),
  );

  router("/");
};
const handleLogout = () => {
  clearUserFromStorage();
  router("/login");
};

window.addEventListener("DOMContentLoaded", () => {
  window.location.hash ? hashRouter() : router();
});
window.addEventListener("popstate", () => {
  router();
});
window.addEventListener("hashchange", () => {
  hashRouter();
});
window.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && e.target.pathname) {
    e.preventDefault();

    if (e.target.id === "logout") {
      handleLogout();
      return;
    }
    window.location.hash
      ? hashRouter(e.target.pathname)
      : router(e.target.pathname);
  }
});
window.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();
    handleLogin();
  }

  if (e.target.id === "profile-form") {
    e.preventDefault();
    handleProfileUpdate();
  }
});
