import renderMain from "../pages/Main";
import renderError from "../pages/Error";
import renderProfile from "../pages/Profile";
import renderLogin from "../pages/Login";

const ROUTES = {
  "/": renderMain,
  "/profile": renderProfile,
  "/login": renderLogin,
  "*": renderError,
};

export default ROUTES;
