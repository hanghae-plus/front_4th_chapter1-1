import routes from "./routes.js";
import { MainPage, ProfilePage, LoginPage, ErrorPage } from "./pages";
const root = document.getElementById("root");

function renderPage() {
  const currentPath = window.location.pathname;
  let page;

  switch (currentPath) {
    case routes.home:
      root.innerHTML = MainPage();
      break;
    case routes.profile:
      root.innerHTML = ProfilePage();
      break;
    case routes.login:
      //   root.innerHTML = LoginPage();
      page = LoginPage();
      root.innerHTML = page.template;
      if (page.init) {
        page.init();
      }
      break;
    default:
      root.innerHTML = ErrorPage();
      break;
  }
}

const navigate = (path) => {
  window.history.pushState({}, "", path);
  renderPage();
};

const setUpRouter = () => {
  window.addEventListener("popstate", renderPage);

  document.addEventListener("DOMContentLoaded", () => {
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
  });
};

export default setUpRouter;
