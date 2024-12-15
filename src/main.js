import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserStore from "./store/userStore";

function createRouter(routes) {
  return function (path) {
    path = path ? path : window.location.pathname;
    let hash = window.location.hash;
    let route = null;
    const user = new UserStore().getUser();

    if (hash === "") {
      if (!user && path === "/profile") path = "/login";
      if (user && path === "/login") path = "/";
      route = routes[path] || routes["404"];
      window.history.pushState(null, "", path);
    } else {
      if (!user && hash === "#/profile") hash = "#/login";
      if (user && hash === "#/login") hash = "#/";
      route = hashRoutes[hash] || hashRoutes[404];
      window.history.pushState(null, "", hash);
    }

    render(route);
  };
}

function render(route) {
  const root = document.getElementById("root");
  console.log(route);
  root.innerHTML = route();

  const cloneRoot = root.cloneNode(true);
  cloneRoot.addEventListener("submit", submitEventHandler);
  cloneRoot.addEventListener("click", clickEventHandler);
  root.replaceWith(cloneRoot);
}

const routes = {
  "/": () => MainPage(),
  "/profile": () => ProfilePage(),
  "/login": () => LoginPage(),
  404: () => NotFoundPage(),
};

const hashRoutes = {
  "#/": () => MainPage(),
  "#/profile": () => ProfilePage(),
  "#/login": () => LoginPage(),
  404: () => NotFoundPage(),
};

const router = createRouter(routes);

function updateContent() {
  router();
}

function submitEventHandler(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const { id } = form;

  if (id === "login-form") {
    const username = formData.get("username");

    if (username) {
      new UserStore().setUser({ username, email: "", bio: "" });
      router("/profile");
    }
  }

  if (id === "profile-form") {
    const username = formData.get("username");
    const email = formData.get("email");
    const bio = formData.get("bio");

    new UserStore().setUser({ username, email, bio });
    router("/profile");
    updateContent();
  }
}

function clickEventHandler(e) {
  const { id, tagName } = e.target;

  if (tagName === "A") {
    e.preventDefault();
    const { href } = e.target;
    let path = href.slice(href.lastIndexOf("/"));
    if (id === "logout") {
      new UserStore().deleteUser();
      path = "/login";
    }
    router(path);
  }
}

window.addEventListener("popstate", updateContent);
window.addEventListener("load", updateContent);
window.addEventListener("hashchange", updateContent);
