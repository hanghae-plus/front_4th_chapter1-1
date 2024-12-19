import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";
import { useUserStore } from "../stores/useUserStore";

const ROUTE_PAGE_MAP = {
  "/": () => renderMainPage(),
  "/login": () => renderLoginPage(),
  "/profile": () => renderProfilePage(),
};

const routeGuard = (route, type = "path") => {
  const isLogin = useUserStore.isLogin();
  const isHash = type === "hash";

  if ((route === "/login" || route === "#/login") && isLogin) {
    return isHash ? "#/" : "/";
  }

  if ((route === "/profile" || route === "#/profile") && !isLogin) {
    return isHash ? "#/login" : "/login";
  }

  return route;
};

export const useRouter = () => {
  const historyRouter = (path) => {
    let pathname = path || window.location.pathname;
    pathname = routeGuard(pathname);

    let render = ROUTE_PAGE_MAP[pathname];
    if (!render) {
      render = () => renderNotFoundPage();
    }

    history.pushState(null, "", pathname);
    render();
  };

  const hashRouter = (hash) => {
    let newHash = hash || window.location.hash;
    newHash = routeGuard(newHash, "hash");

    let render = ROUTE_PAGE_MAP[newHash.replace("#", "")];
    if (!render) {
      render = () => renderNotFoundPage();
    }

    history.pushState(null, "", newHash);
    render();
  };

  const router = (value) => {
    if (window.location.hash) {
      hashRouter(value);
    } else {
      historyRouter(value);
    }
  };

  return { router };
};

const renderMainPage = () => {
  document.getElementById("root").innerHTML = MainPage();
  document
    .querySelector("nav")
    .addEventListener("click", (e) => clickEventHandler(e));
};

const renderLoginPage = () => {
  document.getElementById("root").innerHTML = LoginPage();

  const { router } = useRouter();
  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", (e) =>
    submitEventHandler({ e, onSuccess: () => router("/") }),
  );
};

const renderProfilePage = () => {
  document.getElementById("root").innerHTML = ProfilePage();
  document
    .querySelector("nav")
    .addEventListener("click", (e) => clickEventHandler(e));

  const profileForm = document.querySelector("#profile-form");
  profileForm.addEventListener("submit", (e) => submitEventHandler({ e }));
};

const renderNotFoundPage = () => {
  document.getElementById("root").innerHTML = NotFoundPage();
};

const clickEventHandler = (e) => {
  const { id, href, tagName } = e.target;

  if (tagName === "A") {
    e.preventDefault();

    let path = href.slice(href.lastIndexOf("/"));

    if (id === "logout") {
      useUserStore.resetUserInfoInLocalStorage();
      path = "/login";
    }

    const { router } = useRouter();
    router(path);
  }
};

const submitEventHandler = ({ e, onSuccess }) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userInfo = {
    username: formData.get("username"),
    email: formData.get("email") ?? "",
    bio: formData.get("bio") ?? "",
  };

  useUserStore.setUserInfoInLocalStorage(userInfo);

  onSuccess && onSuccess();
};
