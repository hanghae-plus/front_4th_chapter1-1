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

  if (window.location.pathname === "/") {
    router.navigateTo("/");
  } else if (window.location.pathname === "/profile") {
    router.navigateTo("/profile");
  } else if (window.location.pathname === "/login") {
    router.navigateTo("/login");
    loginInit();
  } else {
    router.navigateTo("/error");
  }
}

function addNavListener() {
  const nav = document.querySelector("nav");
  if (nav) {
    nav.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target.id);
      if (e.target.id === "logout") {
        prefs.remove();
      } else if (e.target.id === "profile") {
        // router.navigateTo(e.target.pathname);
      } else if (e.target.id === "home") {
        // router.navigateTo(e.target.pathname);
      } else {
        return;
      }
      router.navigateTo(e.target.pathname);
    });
  }
}

init();
addNavListener();
