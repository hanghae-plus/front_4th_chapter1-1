import MainPage from "@/pages/MainPage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import UserStore from "@/store/userStore";

export function createRouter() {
  const ROUTES = {
    "/": () => MainPage(),
    "/profile": () => ProfilePage(),
    "/login": () => LoginPage(),
    404: () => NotFoundPage(),
  };

  const HASH_ROUTES = {
    "#/": () => MainPage(),
    "#/profile": () => ProfilePage(),
    "#/login": () => LoginPage(),
    404: () => NotFoundPage(),
  };

  function render(route) {
    const root = document.getElementById("root");
    root.innerHTML = route();
  }

  function validateRouteUser(path) {
    const user = new UserStore().getUser();
    if (!user && path === "/profile") path = "/login";
    if (user && path === "/login") path = "/";
    return path;
  }

  function validateHashRouteUser(hash) {
    const user = new UserStore().getUser();
    if (!user && hash === "#/profile") hash = "#/login";
    if (user && hash === "#/login") hash = "#/";
    return hash;
  }

  function navigator(path) {
    if (window.location.hash) return;
    path = path || window.location.pathname;
    path = validateRouteUser(path);
    const route = ROUTES[path] || ROUTES["404"];
    window.history.pushState(null, "", path);
    render(route);
  }

  function hashNavigator(hash) {
    hash = hash || window.location.hash;
    hash = validateHashRouteUser(hash);
    const route = HASH_ROUTES[hash] || HASH_ROUTES[404];
    window.history.pushState(null, "", hash);
    render(route);
  }

  return {
    router() {
      if (window.location.hash) {
        hashNavigator();
      } else {
        navigator();
      }
    },
    navigator,
  };
}
