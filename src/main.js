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
  const path = window.location.pathname;
  const user = localStorage.getItem("user");
  if (!user && path === "/profile") {
    render("/login");
    return;
  }

  render(path);

  document.body.removeEventListener("submit", submitEventHandler);
  document.body.addEventListener("submit", submitEventHandler);

  document.body.removeEventListener("click", clickEventHandler);
  document.body.addEventListener("click", clickEventHandler);

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
    return;
  }

  if (id === "profile-form") {
    const username = formData.get("username");
    const email = formData.get("email");
    const bio = formData.get("bio");

    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
    return;
  }
}

function clickEventHandler(e) {
  const { id } = e.target;

  if (id === "logout") {
    logout();
  }
}

function logout() {
  localStorage.removeItem("user");
  render("/login");
}

function render(path) {
  window.history.pushState(null, "", path);
  document.body.innerHTML = router(path);
}

window.addEventListener("popstate", updateContent);
window.addEventListener("load", updateContent);
