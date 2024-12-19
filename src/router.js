import routes from "./routes.js";
import { MainPage, ProfilePage, LoginPage, ErrorPage } from "./pages";
import { LOGGED_IN_STATE_STORAGE_KEY } from "./constants/storageKeys.js";

const root = document.getElementById("root");

const guards = {
  [routes.profile]: () => {
    const isLoggedIn =
      localStorage.getItem(LOGGED_IN_STATE_STORAGE_KEY) === "true";
    if (!isLoggedIn) {
      window.history.replaceState({}, "", routes.login);
      return false;
    }
    return true;
  },
  [routes.login]: () => {
    const isLoggedIn =
      localStorage.getItem(LOGGED_IN_STATE_STORAGE_KEY) === "true";
    if (isLoggedIn) {
      window.history.replaceState({}, "", routes.home);
      return false;
    }
    return true;
  },
};

function renderPage() {
  const currentPath = window.location.pathname;
  let page;

  // 가드 체크
  const guard = guards[currentPath];
  if (guard && !guard()) {
    renderPage(); // 리다이렉션 후 다시 렌더링
    return;
  }

  switch (currentPath) {
    case routes.home:
      page = MainPage();
      break;
    case routes.profile:
      page = ProfilePage();
      break;
    case routes.login:
      page = LoginPage();
      break;
    default:
      page = ErrorPage();
      break;
  }

  root.innerHTML = page.template;
  if (page.init) {
    page.init();
  }
}

const navigate = (path) => {
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
