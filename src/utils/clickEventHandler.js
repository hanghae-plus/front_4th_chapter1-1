import { navigator } from "@/router/router";
import userStore from "@/store/userStore";

export function clickEventHandler(e) {
  const { id, tagName } = e.target;

  if (tagName === "A") {
    e.preventDefault();
    const { href } = e.target;
    let path = new URL(href).pathname;
    if (id === "logout") {
      userStore.deleteUser();
      path = "/login";
    }
    navigator(path);
  }
}
