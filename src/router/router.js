import { MainPage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { ProfilePage } from "../pages/profile";
import { ErrorPage } from "../pages/error";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
  "/error": ErrorPage,
};

export const createRouter = (root) => {
  const handleRoute = () => {
    const path = window.location.pathname;

    //라우트 가드
    if (path === "/profile" && !localStorage.getItem("user")) {
      navigate("/login");
      return;
    }

    if (path === "/login" && localStorage.getItem("user")) {
      navigate("/");
      return;
    }

    const page = routes[path] || ErrorPage;
    root.innerHTML = page();
  };

  const navigate = (path) => {
    // 브라우저 url 업데이트
    window.history.pushState({}, "", path);
    // 페이지 렌더링
    handleRoute();
  };

  window.addEventListener("popstate", handleRoute);
  handleRoute();

  return {
    navigate,
    handleRoute,
  };
};
