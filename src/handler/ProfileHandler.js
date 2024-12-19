import { authStore } from "../store/AuthStore";

export function updateProfileHandler(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const bio = formData.get("bio");
  authStore.setUser({ username, email, bio });
}
