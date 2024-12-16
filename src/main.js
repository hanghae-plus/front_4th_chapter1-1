import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

const routes = {
  "/": () => renderMainPage(),
  "/login": () => renderLoginPage(),
  "/profile": () => renderProfilePage(),
};

const router = (path = window.location.hash.slice(1) || "/") => {
  const route = routes[path];

  if (route) {
    history.pushState(null, "", path);
    route();
  } else {
    document.body.innerHTML = `${NotFoundPage()}`;
  }
};

const renderMainPage = () => {
  document.body.innerHTML = `${MainPage()}`;
  document
    .querySelector("nav")
    .addEventListener("click", (e) => clickEventHandler(e));
};

const renderLoginPage = () => {
  document.body.innerHTML = `${LoginPage()}`;
};

const renderProfilePage = () => {
  document.body.innerHTML = `${ProfilePage()}`;
  document
    .querySelector("nav")
    .addEventListener("click", (e) => clickEventHandler(e));
};

function clickEventHandler(e) {
  const { id, href, tagName } = e.target;

  if (tagName === "A") {
    e.preventDefault();

    let path = href.slice(href.lastIndexOf("/"));

    if (id === "logout") {
      path = "/login";
    }

    router(path);
  }
}

window.addEventListener("load", () => router());
window.addEventListener("hashchange", () => router());
window.addEventListener("popstate", () => router());
