import { HASH_ROUTE_DATA, ROUTE_DATA, ROUTE_PATH } from "../constants/Route";
import ErrorPage from "../pages/ErrorPage";
import { getLocalStorage } from "./storage";
const Validate = {
  path(checkData) {
    if (!this.isLogin()) return ROUTE_DATA[ROUTE_PATH.LOGIN];
    if (location.pathname === "/profile" && !this.isLogin())
      return ROUTE_DATA[ROUTE_PATH.LOGIN];
    const data = ROUTE_DATA.find((route) => route.path === checkData);
    return data ? data : ROUTE_DATA[ROUTE_PATH.ERROR];
  },

  hash(checkData) {
    const data = HASH_ROUTE_DATA.find((route) => route.path === checkData);
    return data ? data : { path: "/404", view: ErrorPage() };
  },

  isLogin() {
    if (!getLocalStorage("user")) return false;
    return true;
  },
};

export default Validate;
