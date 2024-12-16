import { Routes } from "../app/routes";
import userService from "../features/userService";

export const router = (path) => {
  if (path === "/profile" && !userService.isLoggedIn()) {
    path = "/login";
  }
  history.pushState({}, "", path);
  const page = Routes[path] ?? Routes[404];

  const { view, init } = page();

  document.querySelector("#root").innerHTML = view;
  init();
};
