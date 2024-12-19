import { route } from "../router.js";
import { authStore } from "../store/AuthStore.js";

export function loginHandler(formData) {
  const username = formData.get("username");

  authStore.setUser({ username, email: "", bio: "" });
  route.navigate("/profile");
}
