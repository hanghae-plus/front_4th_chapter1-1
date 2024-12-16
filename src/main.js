import { Error404Page } from "./pages/404";
import { HomePage } from "./pages/home/home-page";
import { LoginPage } from "./pages/login";
import { ProfilePage } from "./pages/profile";

function createRouter(routes) {
  return (path) => {
    const route = routes[path] || routes["404"];
    return route();
  };
}

const routes = {
  "/": () => HomePage(),
  "/profile": () => ProfilePage(),
  "/login": () => LoginPage(),
  404: () => Error404Page(),
};

const router = createRouter(routes);

const render = () => {
  const path = window.location.pathname;
  const user = localStorage.getItem("user");
  if (!user && path === "/profile") {
    document.body.innerHTML = router("/login");
    return;
  }
  document.body.innerHTML = router(path);
};

window.addEventListener("popstate", render);
window.addEventListener("load", render);
