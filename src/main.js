import { ProfilePage } from "./pages/profile-page";
import { NotFoundPage } from "./pages/not-found-page";
import { LoginPage } from "./pages/login-page";
import { HomePage } from "./pages/home-page";
import { removeUser, isLoggedIn, saveUser } from "./utils/local-storage";

class HistoryRouter {
  constructor() {
    this.routes = {};
    this.root = document.getElementById("root");
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    let currentPath = path !== undefined ? path : window.location.pathname;

    const routeList = Object.keys(this.routes);
    if (!routeList.includes(currentPath)) {
      currentPath = "/404";
    }
    const loggedIn = isLoggedIn();

    if (currentPath === "/login" && loggedIn) {
      currentPath = "/";
    }

    if (!loggedIn && currentPath === "/profile") {
      currentPath = "/login";
    }

    this.render(currentPath);
  }

  render(path) {
    history.pushState(null, "", path);
    const handler = this.routes[path];
    if (handler) {
      this.root.innerHTML = handler();
    }
  }
}

// window.location.hash
// hashchange 이벤트 사용

const historyRouter = new HistoryRouter();

const router = historyRouter;

router.addRoute("/", () => HomePage());
router.addRoute("/login", () => LoginPage());
router.addRoute("/profile", () => ProfilePage());
router.addRoute("/404", () => NotFoundPage());

router.handleRoute();

document.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    if (event.target.id === "logout") {
      event.preventDefault();
      removeUser();
      router.navigateTo("/login");
    } else {
      event.preventDefault();
      router.navigateTo(event.target.getAttribute("href"));
    }
  }
});

document.body.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    const username = e.target.querySelector("#username").value;
    if (username) {
      saveUser(username);
      router.navigateTo("/");
    }
  }

  if (e.target.id === "profile-form") {
    let form = e.target;
    const username = form.querySelector("#username").value;
    const email = form.querySelector("#email").value;
    const bio = form.querySelector("#bio").value;
    saveUser(username, email, bio);
    alert("프로필이 업데이트되었습니다.");
  }
});
