import Layout from "../components/Layout";
import Validate from "../utils/validate";
import { removeLocalStorage } from "../utils/storage";

const Router = () => {
  const root = document.getElementById("root");

  const navigateTo = (path, state = null) => {
    const locationHash = location.hash.replaceAll("#", "");
    const locationPath = location.pathname;
    path = locationHash ? locationHash : path || locationPath;
    const matchPage = Validate.path(path);
    if (!locationHash) {
      history.pushState(state, "", matchPage.path);
    }
    render(matchPage);
  };
  const render = (view) => {
    const page = Layout(view);
    root.innerHTML = page;
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        removeLocalStorage("user");
      });
    }
  };
  return {
    router() {
      navigateTo();
    },
    navigateTo,
  };
};

export default Router;
