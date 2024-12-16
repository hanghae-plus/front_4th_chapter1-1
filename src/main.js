import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";

let pathName = window.location.pathname;

const routeHtml = (route) => {
  document.getElementById("root").innerHTML = pathRender[route];
  buttonsHandler();
};

const pathRender = {
  "/": MainPage(),
  "/login": LoginPage(),
  "/profile": ProfilePage(),
};

class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this)); // ** this , bind 개념확인
  }

  addRoute(path, handler) {
    this.routes[path] = handler; // *** this와 [객체로 넣는 개념 확인]
  }

  navigateTo(path) {
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
      console.log("404 Not Found");
    }
  }
}

const router = new Router();
const routeRender = () => {
  router.addRoute("/", () => routeHtml("/"));
  router.addRoute("/login", () => routeHtml("/login"));
  router.addRoute("/profile", () => routeHtml("/profile"));
};

const buttonsHandler = () => {
  //** 상단메뉴 */
  if (document.querySelector("nav") !== null) {
    document.querySelector("nav").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        router.navigateTo(e.target.pathname);
      }
    });
  }
  //** 로그인 */
  if (document.getElementById("btnLogin") !== null) {
    document.getElementById("btnLogin").addEventListener("click", (e) => {
      e.preventDefault();
      let inputId = document.querySelector("input[name='user-id']").value;
      let inputPw = document.querySelector("input[name='user-pw']").value;

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: inputId,
          password: inputPw,
          email: "",
          bio: "",
        }),
      );
      router.navigateTo("/profile");
      //routeHtml("/profile");
      //location.href = "/profile";
    });
  }
};

window.addEventListener("DOMContentLoaded", routeHtml(pathName));
window.addEventListener("load", routeRender());
