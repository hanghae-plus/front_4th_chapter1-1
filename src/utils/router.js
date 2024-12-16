import { Home } from "../components/HomePage";
import { Login } from "../components/LoginPage";
import { Profile } from "../components/ProfilePage";
import { customLogoutEvent } from "../main";
import { generatePage } from "./functions";

export const PATHNAME_COMPONENT_MAP = Object.freeze({
  "/": Home,
  "/profile": Profile,
  "/login": Login,
});

export const router = () => {
  const handleReplace = (e) => {
    e.preventDefault();
    const href = e.target.href;

    if (href.includes("#")) {
      window.dispatchEvent(customLogoutEvent);

      return;
    }

    history.pushState({}, "", href);
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
