import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

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
  404: () => ErrorPage(),
};

const router = createRouter(routes);

function updateContent() {
  let path = window.location.pathname;
  const user = localStorage.getItem("user");
  if (!user && path === "/profile") path = "/login";
  if (user && path === "/login") path = "/";

  render(path);

  const root = document.getElementById("root");
  root.removeEventListener("submit", submitEventHandler);
  root.addEventListener("submit", submitEventHandler);

  root.removeEventListener("click", clickEventHandler);
  root.addEventListener("click", clickEventHandler);

  if (path === "/profile") {
    const { username, email, bio } = JSON.parse(localStorage.getItem("user"));

    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("bio").value = bio;
  }
}

function submitEventHandler(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const { id } = form;

  if (id === "login-form") {
    const username = formData.get("username");

    if (username) {
      localStorage.setItem(
        "user",
        JSON.stringify({ username, email: "", bio: "" }),
      );

      render("/profile");
      updateContent();
    }
  }

  if (id === "profile-form") {
    const username = formData.get("username");
    const email = formData.get("email");
    const bio = formData.get("bio");

    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
    render("/profile");
    updateContent();
  }
}

function clickEventHandler(e) {
  const { id, tagName } = e.target;

  if (id === "logout") {
    logout();
  }

  if (tagName === "A") {
    e.preventDefault();
    const { href } = e.target;
    const path = href.slice(href.lastIndexOf("/"));
    render(path);
    updateContent();
  }
}

function logout() {
  localStorage.removeItem("user");
  render("/login");
}

function render(path) {
  window.history.pushState(null, "", path);
  document.getElementById("root").innerHTML = router(path);
}

window.addEventListener("popstate", updateContent);
window.addEventListener("load", updateContent);
