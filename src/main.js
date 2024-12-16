import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

const routes = {
  "/": () => renderMainPage(),
  "/login": () => renderLoginPage(),
  "/profile": () => renderProfilePage(),
};

const router = (path = window.location.pathname || "/") => {
  const isLogin = !!localStorage.getItem("user");
  const route = routes[path];

  if (route) {
    if (path === "/profile" && !isLogin) {
      history.pushState(null, "", "/login");
      return router("/login");
    }

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

  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form[0].value;

    localStorage.setItem(
      "user",
      JSON.stringify({ username, email: "", bio: "" }),
    );

    router("/");
  });
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
      localStorage.removeItem("user");
      path = "/login";
    }

    router(path);
  }
}

window.addEventListener("load", () => {
  const initialPath = window.location.pathname;
  router(initialPath);
});

window.addEventListener("popstate", () => {
  const currentPath = window.location.pathname;
  router(currentPath);
});
