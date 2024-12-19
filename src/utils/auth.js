import { LoginEnum } from "./shared/loginEnum.js";
import { getItem, removeItem, setItem } from "../store/localStorage.js";
import {
  createRoutes,
  PagesNameEnum,
  PageToPathEnum,
} from "../routes/index.js";

export const login = (id, passwd) => {
  const { navigateTo } = createRoutes();

  if (typeof id === "string" && typeof passwd === "string") {
    setItem(LoginEnum.LOGIN_TOKEN, { id, passwd });
    navigateTo(PageToPathEnum[PagesNameEnum.HOME]);
  }
};

export const logout = () => {
  const { navigateTo } = createRoutes();
  removeItem(LoginEnum.LOGIN_TOKEN);
  navigateTo(PageToPathEnum[PagesNameEnum.HOME]);
};

export const checkLogin = () => {
  return getItem(LoginEnum.LOGIN_TOKEN) !== null;
};
