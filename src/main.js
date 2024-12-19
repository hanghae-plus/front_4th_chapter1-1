import ServicePage from "./Pages/ServicePage.js";
import MainTemplate from "./Pages/Templates/MainTemplate.js";
import ProfileTemplate from "./Pages/Templates/ProfileTemplate.js";

import LoginPage from "./Pages/LoginPage.js";
import ErrorPage from "./Pages/ErrorPage.js";

if (localStorage.getItem("isLogin")) {
  localStorage.setItem("isLogin", localStorage.getItem("isLogin"));
} else {
  localStorage.setItem("isLogin", false);
}

const logout = () => {
  localStorage.setItem("isLogin", false);
  localStorage.removeItem("user");
  navigateTo("/login");
};

const initEventLoginPage = () => {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", function (event) {
    // 폼 제출 기본 동작 막기 (페이지 새로고침 방지)
    event.preventDefault();

    const username = loginForm.querySelector("input#username").value;

    localStorage.setItem("isLogin", true);
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username,
        email: "",
        bio: "",
      }),
    );
    navigateTo("/");
  });
};

const initEventProfilePage = () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  if (isLogin) {
    const profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", function (event) {
      // 폼 제출 기본 동작 막기 (페이지 새로고침 방지)
      event.preventDefault();

      const username = profileForm.querySelector("input#username").value;
      const email = profileForm.querySelector("input#email").value;
      const bio = profileForm.querySelector("textarea#bio").value;

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: username,
          email: email,
          bio: bio,
        }),
      );
    });
  }
};

const routes = {
  "/": {
    template: () => ServicePage(MainTemplate),
    renderAfter: () => {},
    auth: [],
  },
  "/profile": {
    template: () => ServicePage(ProfileTemplate),
    renderAfter: initEventProfilePage,
    auth: ["requireLogin"],
  },
  "/login": {
    template: LoginPage,
    renderAfter: initEventLoginPage,
    auth: ["requireLogout"],
  },
  "/logout": {
    template: () => {},
    renderAfter: logout,
    auth: ["requireLogin"],
  },
};

const renderPage = (path) => {
  const $root = document.getElementById("root");
  if (routes[path]) {
    $root.innerHTML = routes[path]["template"]();
    routes[path]["renderAfter"]();
  } else {
    $root.innerHTML = `${ErrorPage()}`;
  }
};

function renderRoute() {
  const hash = window.location.hash.replace("#", "") || "/";
  renderPage(hash);
}

window.addEventListener("hashchange", renderRoute);

const routeGuard = (path) => {
  if (!routes[path]) {
    return "/error";
  }
  const requireLogin = routes[path]["auth"].includes("requireLogin");
  const requireLogout = routes[path]["auth"].includes("requireLogout");
  const isLogin = localStorage.getItem("isLogin");
  if (requireLogin && isLogin === "false") {
    return "/login";
  }
  if (requireLogout && isLogin === "true") {
    return "/";
  }
  return path;
};

document.body.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "A") {
    e.preventDefault(); // 새로고침 막기
    navigateTo(e.target.getAttribute("href"));
  }
});

// pushState로 기록하고 render page
function navigateTo(url) {
  const path = routeGuard(url);
  history.pushState(null, "", path);
  renderPage(path);
}

// popstate 이벤트: 뒤로가거나 앞으로 갔을 때 페이지 렌더링
window.addEventListener("popstate", () => {
  let path = window.location.pathname;
  path = routeGuard(path);
  renderPage(path);
});

let path = window.location.pathname;
path = routeGuard(path);
navigateTo(path);
