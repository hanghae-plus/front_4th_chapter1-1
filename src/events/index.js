import { initNavigation } from "./navigation.js";
import { initLogin, initLogOut } from "./login.js";

export const initEvents = () => {
  initNavigation();
  initLogin();
  initLogOut();
};
