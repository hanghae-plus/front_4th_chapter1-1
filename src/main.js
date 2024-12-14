import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

function createRouter(routes) {
  return function (path) {
    const route = routes[path] || routes["404"];
    return route();
  };
}

const routes = {
  "/": () => MainPage(),
  "/profile": () => ProfilePage(),
  "/login": () => LoginPage(),
  404: () => ErrorPage(),
};

const router = createRouter(routes);

function updateContent() {
  // 렌더링
  const path = window.location.pathname;
  const user = localStorage.getItem("user");
  if (!user && path === "/profile") {
    document.body.innerHTML = router("/login");
    return;
  }

  document.body.innerHTML = router(path);
}

window.addEventListener("popstate", updateContent);
window.addEventListener("load", updateContent);
