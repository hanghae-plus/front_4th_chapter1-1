import Layout from "../components/Layout";
import Validate from "../utils/validate";
import { removeLocalStorage } from "../utils/storage";

const Router = () => {
  const root = document.getElementById("root");

  const navigateTo = (path, state = null) => {
    path = path || location.pathname;
    const matchPage = Validate.path(path);
    history.pushState(state, "", matchPage.path);
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
