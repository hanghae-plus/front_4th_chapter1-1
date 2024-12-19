import { MainPage } from "../pages/mainPage.js";
import { LoginPage } from "../pages/loginPage.js";
import { ProfilePage } from "../pages/profilePage.js";
import { mainEvents } from "../events/mainEvents.js";
import { loginEvents } from "../events/loginEvents.js";

export const PATHS = {
  MAIN: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
};

export const Routes = {
  [PATHS.MAIN]: () => MainPage(),
  [PATHS.LOGIN]: () => LoginPage(),
  [PATHS.PROFILE]: () => ProfilePage(),
};

// 경로별 이벤트 등록
export const eventRegister = (path) => {
  switch (path) {
    case PATHS.MAIN:
    case PATHS.PROFILE:
      mainEvents();
      break;
    case PATHS.LOGIN:
      loginEvents();
      break;
    default:
      break;
  }
};
