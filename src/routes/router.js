import render from "../core/render";
import isLogin from "../utils/isLogin";
import handleProfile from "../pages/handleProfile";

import ROUTES from "../routes/routes";
import NotFoundPage from "../pages/NotFoundPage";
import Header from "../components/Header";
import Footer from "../components/Footer";

const makeComponent = (path) => {
  const header = path === "/" || path === "/profile" ? Header() : "";
  const footer = path === "/" || path === "/profile" ? Footer() : "";
  const component = ROUTES[path] || NotFoundPage();
  return header + component + footer;
};

const router = (path) => {
  if (window.location.hash) return;
  path = path || window.location.pathname;

  if (path === "/profile") {
    if (!isLogin()) {
      path = "/login";
    }
  }

  if (path === "/login" && isLogin()) {
    path = "/";
  }

  window.history.pushState({}, "", path);
  const component = makeComponent(path);
  render(component);
  handleProfile();
};

export default router;
