import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserStore from "./store/userStore";

function createRouter(routes) {
  return function (path) {
    const route = routes[path] || routes["404"];
    return route();
  };
}

const routes = {
  "/": () => MainPage(),
  "/profile": () => ProfilePage(),
  "/login": () => LoginPage(),
  404: () => NotFoundPage(),
};

const router = createRouter(routes);

function updateContent() {
  let path = window.location.pathname;
  render(path);
}

function render(path) {
  const user = new UserStore().getUser();
  if (!user && path === "/profile") path = "/login";
  if (user && path === "/login") path = "/";

  window.history.pushState(null, "", path);
  const root = document.getElementById("root");
  root.innerHTML = router(path);

  const cloneRoot = root.cloneNode(true);
  cloneRoot.addEventListener("submit", submitEventHandler);
  cloneRoot.addEventListener("click", clickEventHandler);
  root.replaceWith(cloneRoot);
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
      render("/profile");
    }
  }

  if (id === "profile-form") {
    const username = formData.get("username");
    const email = formData.get("email");
    const bio = formData.get("bio");

    new UserStore().setUser({ username, email, bio });
    render("/profile");
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
    render(path);
  }
}

window.addEventListener("popstate", updateContent);
window.addEventListener("load", updateContent);
