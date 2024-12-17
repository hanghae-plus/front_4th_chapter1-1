import Error404Page from "./pages/404/404";
import HomePage from "./pages/home/home-page";
import LoginPage from "./pages/login/login-page";
import { ProfilePage } from "./pages/profile/profile-page";
import { MyRouter } from "./shared/router/router";

function createRouter(routes) {
  return (path) => {
    const route = routes[path] || routes["404"];
    return route;
  };
}
const routes = {
  "/": HomePage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  404: Error404Page,
};

const router = createRouter(routes);

export const App = {
  render: () => {
    const path = MyRouter.pathname;
    const CurrentPage = router(path);
    document.querySelector("#root").innerHTML = CurrentPage();
    CurrentPage.init?.();
  },
};
