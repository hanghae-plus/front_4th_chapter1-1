import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { userManager } from "./user";
import { NotFoundPage } from "../pages/NotFoundPage";

export const PATHNAME_COMPONENT_MAP = Object.freeze({
  "/": () => renderMainPage(),
  "/profile": () => renderProfilePage(),
  "/login": () => renderLoginPage(),
});

const handleRouteGuard = (path) => {
  const isLogin = userManager.isLogin();
  if (path === "/login" && isLogin) return "/";
  if (path === "/profile" && !isLogin) return "/login";
  return path;
};

export const router = (path) => {
  let pathname = path || window.location.pathname;

  const isInvalid = !Object.keys(PATHNAME_COMPONENT_MAP).includes(pathname);

  pathname = handleRouteGuard(pathname);

  const page = isInvalid
    ? renderNotFoundPage
    : PATHNAME_COMPONENT_MAP[pathname];
  if (window.location.pathname !== pathname) {
    history.pushState(null, "", pathname);
  }
  page();
};

const renderMainPage = () => {
  document.querySelector("#root").innerHTML = MainPage();
  document.querySelector("nav").addEventListener("click", handleClick);
};

const renderProfilePage = () => {
  document.querySelector("#root").innerHTML = ProfilePage();
  document.querySelector("nav").addEventListener("click", handleClick);
  document.querySelector("#profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const userDataMap = {
      username: "",
      email: "",
      bio: "",
    };

    document.querySelectorAll("input, textarea").forEach((element) => {
      const userDataKey = element.id;

      userDataMap[userDataKey] = element.value;

      userManager.setUserLocalStorage(userDataMap);
      alert("프로필이 업데이트되었습니다.");
    });
  });
};

const renderLoginPage = () => {
  document.querySelector("#root").innerHTML = LoginPage();
  document.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.body.querySelector(`#username`)?.value;

    userManager.setUserLocalStorage({ username: userName, email: "", bio: "" });
    router("/profile");
  });
};

const renderNotFoundPage = () => {
  document.querySelector("#root").innerHTML = NotFoundPage();
};

const handleClick = (e) => {
  if (e.target.tagName === "A") {
    const { href } = e.target;
    let path = href.slice(href.lastIndexOf("/"));
    e.preventDefault();

    if (e.target.id === "logout") {
      userManager.resetUserLocalStorage();

      path = "/login";
    }

    router(path);
  }
};
