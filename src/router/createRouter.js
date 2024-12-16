import MainPage from "@/pages/MainPage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import UserStore from "@/store/userStore";

const routes = {
  "/": () => MainPage(),
  "/profile": () => ProfilePage(),
  "/login": () => LoginPage(),
  404: () => NotFoundPage(),
};

const hashRoutes = {
  "#/": () => MainPage(),
  "#/profile": () => ProfilePage(),
  "#/login": () => LoginPage(),
  404: () => NotFoundPage(),
};

export function createRouter() {
  return function (path) {
    path = path ? path : window.location.pathname;
    let hash = window.location.hash;
    let route = null;
    const user = new UserStore().getUser();

    if (hash === "") {
      if (!user && path === "/profile") path = "/login";
      if (user && path === "/login") path = "/";
      route = routes[path] || routes["404"];
      window.history.pushState(null, "", path);
    } else {
      if (!user && hash === "#/profile") hash = "#/login";
      if (user && hash === "#/login") hash = "#/";
      route = hashRoutes[hash] || hashRoutes[404];
      window.history.pushState(null, "", hash);
    }

    render(route);
  };
}

function render(route) {
  const root = document.getElementById("root");
  root.innerHTML = route();
}
