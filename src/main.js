import { createRouter } from "@/router/createRouter";
import UserStore from "@/store/userStore";

const router = createRouter();

function submitEventHandler(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const { id } = form;

  if (id === "login-form") {
    login(formData);
  }

  if (id === "profile-form") {
    updateProfile(formData);
  }
}

function login(formData) {
  const username = formData.get("username");
  if (username) {
    new UserStore().setUser({ username, email: "", bio: "" });
    router("/profile");
  }
}

function updateProfile(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const bio = formData.get("bio");
  new UserStore().setUser({ username, email, bio });
  router("/profile");
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

document.body.addEventListener("submit", submitEventHandler);
document.body.addEventListener("click", clickEventHandler);
window.addEventListener("popstate", () => router());
window.addEventListener("load", () => router());
window.addEventListener("hashchange", () => router());
