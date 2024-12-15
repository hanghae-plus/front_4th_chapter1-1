import routes from "./routes.js";
import { MainPage, ProfilePage, LoginPage, ErrorPage } from "./components";

function renderPage() {
  const path = window.location.pathname;
  const root = document.getElementById("root");

  switch (path) {
    case routes.home:
      root.innerHTML = MainPage();
      break;
    case routes.profile:
      root.innerHTML = ProfilePage();
      break;
    case routes.login:
      root.innerHTML = LoginPage();
      break;
    default:
      root.innerHTML = ErrorPage();
      break;
  }
}

function navigate(path) {
  window.history.pushState({}, "", path);
  renderPage();
}

function setUpRouter() {
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
}

export default setUpRouter;
