import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";

const routeHtml = (route) => {
  if (!pathRender[route]) {
    route = 404;
  }

  if (route === "/profile" && !localStorage.getItem("user")) {
    route = "/login";
  }
  document.getElementById("root").innerHTML = pathRender[route]();
  buttonsHandler();
};

const pathRender = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
  404: ErrorPage,
};

class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    if (path == "/profile" && !localStorage.getItem("user")) {
      path = "/login";
    }
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      document.getElementById("root").innerHTML = pathRender[404]; // 404 페이지 렌더링
    }
  }
}

const router = new Router();
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

      router.navigateTo("/");
      routeHtml("/");
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
  routeHtml(window.location.pathname);
});
window.addEventListener(" load ", routeRender());
