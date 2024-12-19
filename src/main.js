import userStore from "@/store/userStore";
import { submitEventHandler, clickEventHandler } from "@/utils";
import { addRoutes, navigator, setRenderTarget } from "@/router/router";
import MainPage from "@/pages/MainPage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import Layout from "@/components/layout/Layout";

setRenderTarget(document.getElementById("root"));

addRoutes(
  {
    element: Layout,
    children: [
      { path: "/", element: MainPage },
      { path: "/profile", element: ProfilePage },
      { path: "#/profile", element: ProfilePage },
      { path: "#/", element: MainPage },
    ],
  },
  { path: "/login", element: LoginPage },
  { path: "#/login", element: LoginPage },
  { path: "*", element: NotFoundPage },
);

function validateRouteUser(path) {
  const isLogin = userStore.isLogin();
  if (!isLogin && path === "/profile") path = "/login";
  if (isLogin && path === "/login") path = "/";
  return path;
}

function validateHashRouteUser(hash) {
  const isLogin = userStore.isLogin();
  if (!isLogin && hash === "#/profile") hash = "#/login";
  if (isLogin && hash === "#/login") hash = "#/";
  return hash;
}

function branchRoute() {
  let { hash, pathname } = window.location;
  if (hash) {
    hash = validateHashRouteUser(hash);
    navigator(hash);
  } else {
    pathname = validateRouteUser(pathname);
    navigator(pathname);
  }
}

document.body.addEventListener("submit", submitEventHandler);
document.body.addEventListener("click", clickEventHandler);
window.addEventListener("load", () => branchRoute());
window.addEventListener("popstate", () => branchRoute());
window.addEventListener("hashchange", () => branchRoute());
