import renderError from "../pages/error";
import renderLogin from "../pages/login";
import renderMain from "../pages/main";
import renderProfile from "../pages/profile";

const ROUTES = {
  "/": renderMain,
  "/profile": renderProfile,
  "/login": renderLogin,
  "*": renderError,
};

export default ROUTES;
