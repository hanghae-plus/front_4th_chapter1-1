import { initNavigation } from "./navigation.js";
import { initLogin, initLogOut } from "./login.js";
import { initProfile } from "./profile.js";

export const initEvents = () => {
  initNavigation();
  initLogin();
  initLogOut();
  initProfile();
};
