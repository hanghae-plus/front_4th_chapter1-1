import { Home } from "../components/HomePage";
import { Login } from "../components/LoginPage";
import { Profile } from "../components/ProfilePage";
import { generatePage } from "./functions";

export const PATHNAME_COMPONENT_MAP = Object.freeze({
  "/": Home,
  "/profile": Profile,
  "/login": Login,
});

export const router = () => {
  const handleReplace = (e) => {
    e.preventDefault();
    history.pushState({}, "", e.target.href);
  };

  return {
    handleReplace,
  };
};

export const initRouteChange = () => {
  generatePage();
  window.addEventListener("popstate", generatePage);
  window.addEventListener("urlChange", generatePage);
};
