import { PagesNameEnum } from "../../routes/index.js";
import {
  ErrorPage,
  LoginPage,
  MainPage,
  ProfilePage,
} from "../../pages/index.js";

export const RenderingEnum = {
  [PagesNameEnum.HOME]: () => MainPage(),
  [PagesNameEnum.LOGIN]: () => LoginPage(),
  [PagesNameEnum.PROFILE]: () => ProfilePage(),
  [PagesNameEnum.ERROR]: () => ErrorPage(),
};
