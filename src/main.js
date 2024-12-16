import Router from "./routes/router.js";
import UserPreferences from "./utils/userPreference.js";
import MainPage from "./pages/mainPage.js";
import ErrorPage from "./pages/errorPage.js";
import LoginPage, { loginInit } from "./pages/loginPage.js";
import ProfilePage from "./pages/profilePage.js";

const router = new Router();
const prefs = new UserPreferences();

function init() {
  router.addRoute("/", () => {
    const mainPage = MainPage();
    mainPage.render();
    addNavListener();
  });
  router.addRoute("/profile", () => {
    const profilePage = ProfilePage();
    profilePage.render();
    addNavListener();
  });
  router.addRoute("/login", () => {
    const loginPage = LoginPage();
    loginPage.render();
    loginInit();
  });
  router.addRoute("/error", () => {
    const errorPage = ErrorPage();
    errorPage.render();
  });

  router.renderInit();
}

function addNavListener() {
  const nav = document.querySelector("nav");
  if (nav) {
    nav.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target && e.target.pathname === "/login") {
        prefs.remove();
        router.navigateTo(e.target.pathname);
      } else if (e.target && e.target.pathname === "/profile") {
        router.navigateTo(e.target.pathname);
      } else if (e.target && e.target.pathname === "/") {
        router.navigateTo(e.target.pathname);
      } else {
        return;
      }
    });
  }
}

init();
addNavListener();
