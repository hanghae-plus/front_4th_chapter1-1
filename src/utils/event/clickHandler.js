import { createRoutes, PagesNameEnum, PageToPathEnum } from "../../routes";
import { checkLogin, logout } from "../auth.js";

export const clickHandler = (event) => {
  const { navigateTo } = createRoutes();

  if (event.target.tagName === "A") {
    event.preventDefault();

    if (
      event.target.getAttribute("href") ===
        PageToPathEnum[PagesNameEnum.PROFILE] &&
      !checkLogin()
    ) {
      navigateTo("/login");
    }

    if (event.target.getAttribute("id") === "logout-button") {
      logout();
    }

    if (event.target.getAttribute("id") === "login-button") {
      navigateTo("/login");
    }

    navigateTo(event.target.getAttribute("href"));
  }
};
