import { ProfilePage } from "./pages/profile-page";
import { NotFoundPage } from "./pages/not-found-page";
import { LoginPage } from "./pages/login-page";
import { HomePage } from "./pages/home-page";
import { removeUser, isLoggedIn, saveUser } from "./utils/local-storage";
import { validateEmail } from "./utils/validator";
// import { isLoggedIn } from "./utils/local-storage";

class Router {
  constructor() {
    this.routes = {};
    this.root = document.getElementById("root");
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
    // console.log(`handler: ${handler()}`)
  }

  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    if (path === "/profile" && !isLoggedIn) {
      path = "/login";
    }

    const handler = this.routes[path];

    if (handler) {
      this.root.innerHTML = handler();
    }
  }

  render() {
    let currentPath = window.location.pathname;
    const routeList = Object.keys(this.routes);
    if (!routeList.includes(currentPath)) {
      currentPath = "/404";
    }
    this.handleRoute(currentPath);
  }
}

const router = new Router();
router.addRoute("/", () => HomePage());
router.addRoute("/login", () => LoginPage());
router.addRoute("/profile", () => ProfilePage());
router.addRoute("/404", () => NotFoundPage());

document.getElementById("root").addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    console.log(`li tag tapped`);
    // console.log("List item ", e.target.id, " was clicked!");
  }
});

document.addEventListener("click", (event) => {
  //   console.log(`hi`);
  if (event.target.tagName === "A") {
    // 모든 <a> 태그에 대해 처리
    event.preventDefault(); // 기본 동작(페이지 이동) 방지
    // navigate(event.target.getAttribute("href")); // 경로 가져오기
    router.navigateTo(event.target.getAttribute("href"));
  }
});

document.getElementById("root").addEventListener("click", (e) => {
  if (e.target && e.target.nodeName === "BUTTON") {
    const form = e.target.parentNode;
    console.log(`form id: ${form.id}`);

    if (e.target.id === "logout") {
      removeUser();
      router.navigateTo("/login");
    }

    if (form.id === "login-form") {
      const username = form.querySelector("#username").value;
      if (username) {
        saveUser(username);
        router.navigateTo("/");
      }
    }

    if (form.id === "profile-form") {
      const username = form.querySelector("#username").value;
      const email = form.querySelector("#email").value;
      const bio = form.querySelector("#bio").value;
      if (validateEmail(email)) {
        saveUser(username, email, bio);
        alert("프로필이 업데이트되었습니다.");
      }
    }
  }
});

router.render();
