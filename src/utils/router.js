import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { userManager } from "./user";
import { NotFoundPage } from "../pages/NotFoundPage";

const PATHNAME_COMPONENT_MAP = Object.freeze({
  "/": () => renderMainPage(),
  "/profile": () => renderProfilePage(),
  "/login": () => renderLoginPage(),
});

const HASH_PATHNAME_COMPONENT_MAP = Object.freeze({
  "#/": () => renderMainPage(),
  "#/profile": () => renderProfilePage(),
  "#/login": () => renderLoginPage(),
});

const historyRouteGuard = (path) => {
  const isLogin = userManager.isLogin();

  if (path === "/login" && isLogin) {
    return "/";
  }

  if (path === "/profile" && !isLogin) {
    return "/login";
  }

  return path;
};

const hashRouteGuard = (hash) => {
  const isLogin = userManager.isLogin();

  if (hash === "#/login" && isLogin) {
    return "#/";
  }

  if (hash === "#/profile" && !isLogin) {
    return "#/login";
  }

  return hash;
};

export const useRouter = () => {
  const historyRouter = (path) => {
    let pathname = path || window.location.pathname;

    const isInvalid = !Object.keys(PATHNAME_COMPONENT_MAP).includes(pathname);

    pathname = historyRouteGuard(pathname);

    const page = isInvalid
      ? renderNotFoundPage
      : PATHNAME_COMPONENT_MAP[pathname];

    history.pushState(null, "", pathname);

    page();
  };

  const hashRouter = (hash) => {
    let refinedHash = hash || window.location.hash;

    if (!refinedHash.includes("#")) {
      refinedHash = `#${hash}`;
    }

    const isInvalid = !Object.keys(HASH_PATHNAME_COMPONENT_MAP).includes(
      refinedHash,
    );

    refinedHash = hashRouteGuard(refinedHash);

    const page = isInvalid
      ? renderNotFoundPage
      : HASH_PATHNAME_COMPONENT_MAP[refinedHash];

    history.pushState(null, "", refinedHash);

    page();
  };

  return {
    router(value) {
      if (window.location.hash) {
        hashRouter(value);
      } else {
        historyRouter(value);
      }
    },
  };
};

const renderMainPage = () => {
  document.querySelector("#root").innerHTML = MainPage();
  document.querySelector("nav").addEventListener("click", handleClick);
};

const renderProfilePage = () => {
  document.querySelector("#root").innerHTML = ProfilePage();
  document.querySelector("nav").addEventListener("click", handleClick);
  document
    .querySelector("#profile-form")
    .addEventListener("submit", handleProfileFormSubmit);
};

const renderLoginPage = () => {
  document.querySelector("#root").innerHTML = LoginPage();
  document
    .querySelector("#login-form")
    .addEventListener("submit", handleLoginFormSubmit);
};

const renderNotFoundPage = () => {
  document.querySelector("#root").innerHTML = NotFoundPage();
};

const handleProfileFormSubmit = (e) => {
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
  });

  alert("프로필이 업데이트되었습니다.");
};

const handleLoginFormSubmit = (e) => {
  e.preventDefault();
  const userName = document.body.querySelector(`#username`)?.value;

  userManager.setUserLocalStorage({ username: userName, email: "", bio: "" });

  const { router } = useRouter();
  router("/profile");
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

    const { router } = useRouter();

    router(path);
  }
};
