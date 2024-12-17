import { createRouter } from "@/router/createRouter";
import UserStore from "@/store/userStore";

const { navigator } = createRouter();

export function clickEventHandler(e) {
  const { id, tagName } = e.target;

  if (tagName === "A") {
    e.preventDefault();
    const { href } = e.target;
    let path = new URL(href).pathname;
    if (id === "logout") {
      new UserStore().deleteUser();
      path = "/login";
    }
    navigator(path);
  }
}
