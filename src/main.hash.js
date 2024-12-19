import { MainPage, LoginPage, ProfilePage, ErrorPage } from "./pages";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
  "*": ErrorPage,
};

// 라우트 가드 설정
const guards = {
  "/profile": () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login", true);
      return false;
    }
    return true;
  },
  "/login": () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/", true);
      return false;
    }
    return true;
  },
};

const getPath = () => window.location.hash.slice(1) || "/";

const renderComponent = (path) => {
  // 가드 체크를 먼저 수행
  const guard = guards[path];
  if (guard && !guard()) {
    return;
  }

  const component = (routes[path] || routes["*"])();
  const root = document.getElementById("root");
  root.innerHTML = component.template;
  component.init?.();
};

const handleRoute = () => {
  const path = getPath();
  renderComponent(path);
};

export const navigate = (path, replace = false) => {
  const hashPath = path === "/" ? "" : path;
  if (replace) {
    window.location.replace(`#${hashPath}`);
  } else {
    window.location.hash = hashPath;
  }
};

// 라우터 초기화
const initRouter = () => {
  window.addEventListener("hashchange", handleRoute);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (!window.location.hash) {
        navigate("/", true);
      } else {
        handleRoute();
      }
    });
  } else {
    if (!window.location.hash) {
      navigate("/", true);
    } else {
      handleRoute();
    }
  }
};

initRouter();
