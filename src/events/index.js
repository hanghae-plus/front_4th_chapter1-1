import { initNavigation } from "./navigation.js";
import { initLogin } from "./login.js";

export const initEvents = () => {
  initNavigation();
  initLogin();
};
