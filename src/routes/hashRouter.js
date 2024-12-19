import render from "../core/render";
import isLogin from "../utils/isLogin";
import handleProfile from "../pages/handleProfile";
import HASH_ROUTES from "./hashRoutes";
import NotFoundPage from "../pages/NotFoundPage";

const hashRouter = (path) => {
  path = path || window.location.hash;

  if (path === "#/profile") {
    if (!isLogin()) {
      path = "#/login";
    }
  }

  if (path === "#/login" && isLogin()) {
    path = "#/";
  }

  window.history.pushState({}, "", path);
  const component = (HASH_ROUTES[path] || (() => NotFoundPage()))();
  render(component);
  handleProfile();
};

export default hashRouter;
