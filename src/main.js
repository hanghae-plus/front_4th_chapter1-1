import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import { useUserStore } from "./stores/useUserStore";

const routes = {
  "/": () => renderMainPage(),
  "/login": () => renderLoginPage(),
  "/profile": () => renderProfilePage(),
};

const router = (path = window.location.pathname || "/") => {
  const route = routes[path];
  const isLogin = useUserStore.isLogin();

  if (route) {
    if (path === "/profile" && !isLogin) {
      history.pushState(null, "", "/login");
      return router("/login");
    }

    history.pushState(null, "", path);
    route();
  } else {
    document.getElementById("root").innerHTML = `${NotFoundPage()}`;
  }
};

const renderMainPage = () => {
  document.getElementById("root").innerHTML = `${MainPage()}`;
  document
    .querySelector("nav")
    .addEventListener("click", (e) => clickEventHandler(e));
};

const renderLoginPage = () => {
  document.getElementById("root").innerHTML = `${LoginPage()}`;

  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target.querySelector('input[type="text"]').value;

    useUserStore.setUserInfoInLocalStorage({ username, email: "", bio: "" });

    router("/");
  });
};

const renderProfilePage = () => {
  document.getElementById("root").innerHTML = `${ProfilePage()}`;
  document
    .querySelector("nav")
    .addEventListener("click", (e) => clickEventHandler(e));

  const profileForm = document.querySelector("#profile-form");
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target.querySelector("#username").value;
    const email = e.target.querySelector("#email").value;
    const bio = e.target.querySelector("#bio").value;

    useUserStore.setUserInfoInLocalStorage({ username, email, bio });
  });
};

function clickEventHandler(e) {
  const { id, href, tagName } = e.target;

  if (tagName === "A") {
    e.preventDefault();

    let path = href.slice(href.lastIndexOf("/"));

    if (id === "logout") {
      useUserStore.resetUserInfoInLocalStorage();
      path = "/login";
    }

    router(path);
  }
}

window.addEventListener("load", () => router());
window.addEventListener("popstate", () => router());
