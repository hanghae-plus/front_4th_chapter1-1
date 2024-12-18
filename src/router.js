import routes from "./routes.js";
import { MainPage, ProfilePage, LoginPage, ErrorPage } from "./pages";
import { LOGGED_IN_STATE_STORAGE_KEY } from "./constants/storageKeys.js";
const root = document.getElementById("root");

function renderPage() {
  const currentPath = window.location.pathname;
  let page;

  console.log("renderPage", currentPath, page);
  switch (currentPath) {
    case routes.home:
      page = MainPage();
      root.innerHTML = page.template;
      if (page.init) {
        page.init();
      }
      break;
    case routes.profile: {
      const loggedInState = localStorage.getItem(LOGGED_IN_STATE_STORAGE_KEY);
      if (!loggedInState) {
        window.history.replaceState({}, "", routes.login);
        page = LoginPage();
        root.innerHTML = page.template;
        if (page.init) {
          page.init();
        }
        return;
      }

      page = ProfilePage();
      root.innerHTML = page.template;
      if (page.init) {
        page.init();
      }
      break;
    }
    case routes.login:
      page = LoginPage();
      root.innerHTML = page.template;
      if (page.init) {
        page.init();
      }
      break;
    default:
      page = ErrorPage();
      root.innerHTML = page.template;
      if (page.init) {
        page.init();
      }
      break;
  }
}

const navigate = (path) => {
  console.log("navigate", path);
  window.history.pushState({}, "", path);
  renderPage();
};

const setUpRouter = () => {
  window.addEventListener("popstate", renderPage);

  renderPage();
  document.body.addEventListener("click", (event) => {
    const target = event.target.closest("a");
    if (
      target &&
      target.tagName === "A" &&
      target.href.startsWith(window.location.origin)
    ) {
      event.preventDefault();
      navigate(target.pathname);
    }
  });
};

export { navigate };
export default setUpRouter;
