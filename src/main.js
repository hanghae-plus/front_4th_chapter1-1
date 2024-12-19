import { pathRender } from "./pathRender";
import { Router, HashRouter } from "./router";

const router = window.location.hash ? new HashRouter() : new Router();

const routeHtml = (route) => {
  route =
    route == window.location.hash
      ? window.location.hash.slice(1) || "/"
      : route;

  if (!pathRender[route]) {
    route = 404;
  }
  if (route == "/login" && localStorage.getItem("user")) {
    route = "/";
    router.navigateTo("/");
    buttonsHandler();
    return;
  }
  if (window.location.pathname == "/index.hash.html") {
    route = "/login";
    router.navigateTo("/login");
  }
  if (window.location.hash == "#/nonexistent") {
    route = 404;
  }
  if (route === "/profile" && !localStorage.getItem("user")) {
    route = "/login";
  }
  document.getElementById("root").innerHTML = "";
  document.getElementById("root").innerHTML = pathRender[route]();
  buttonsHandler();
};

const routeRender = () => {
  router.addRoute("/", () => routeHtml("/"));
  router.addRoute("/login", () => routeHtml("/login"));
  router.addRoute("/profile", () => routeHtml("/profile"));
  router.addRoute(404, () => pathRender[404]);
};

const buttonsHandler = () => {
  // 로그아웃 버튼
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      if (!window.location.hash) {
        router.navigateTo("/login");
        routeHtml("/login");
      } else {
        router.navigateTo("#/login");
        routeHtml("#/login");
      }
    });
  }

  // 상단 메뉴 클릭
  if (document.querySelector("nav") !== null) {
    document.querySelector("nav").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const path = e.target.pathname;
        router.navigateTo(path);
        routeHtml(path);
      }
    });
  }
  // 로그인
  if (document.getElementById("login-form") !== null) {
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      let inputId = document.getElementById("username").value;
      // 로컬스토리지에 사용자정보 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: inputId,
          email: "",
          bio: "",
        }),
      );

      router.navigateTo("/profile");
      routeHtml("/profile");
    });
  }
  // 프로필 수정
  if (document.getElementById("profile-form") !== null) {
    document.getElementById("profile-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const updatedUsername = document.getElementById("username").value;
      const updatedBio = document.getElementById("bio").value;
      const updatedEmail = document.getElementById("email").value;

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: updatedUsername,
          email: updatedEmail,
          bio: updatedBio,
        }),
      );
      console.log("프로필이 성공적으로 수정되었습니다!");

      routeHtml("/profile");
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  routeHtml(
    window.location.hash ? window.location.hash : window.location.pathname,
  );
});
window.addEventListener(" load ", routeRender());
