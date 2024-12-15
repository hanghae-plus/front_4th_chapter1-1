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
  const user = new UserStore().getUser();
  if (!user && path === "/profile") path = "/login";
  if (user && path === "/login") path = "/";

  render(path);

  const root = document.getElementById("root");
  root.removeEventListener("submit", submitEventHandler);
  root.addEventListener("submit", submitEventHandler);

  root.removeEventListener("click", clickEventHandler);
  root.addEventListener("click", clickEventHandler);
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
      updateContent();
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

  if (id === "logout") {
    new UserStore().deleteUser();
    render("/login");
  }

  if (tagName === "A") {
    e.preventDefault();
    const { href } = e.target;
    const path = href.slice(href.lastIndexOf("/"));
    render(path);
    updateContent();
  }
}

function render(path) {
  window.history.pushState(null, "", path);
  document.getElementById("root").innerHTML = router(path);
}

window.addEventListener("popstate", updateContent);
window.addEventListener("load", updateContent);
