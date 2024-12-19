import { navigator } from "@/router/router";
import userStore from "@/store/userStore";

export function submitEventHandler(e) {
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
    userStore.setUser({ username, email: "", bio: "" });
    navigator("/profile");
  }
}

function updateProfile(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const bio = formData.get("bio");
  userStore.setUser({ username, email, bio });
  navigator("/profile");
}
