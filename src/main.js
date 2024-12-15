import ErrorPage from "./pages/Error";
import routes from "./routes";

/**
 * @description path에 따라 렌더해주는 함수. routes내 허용되는 값이 아닌 경우 에러페이지로 라우팅
 */
const render = (path) => {
  const root = document.getElementById("root");
  root.innerHTML = routes[path] || ErrorPage();
};

const navigateTo = (path) => {
  window.history.pushState({}, path, path);
  render(path);
};

/**
 * @description 라우터를 초기화하는 함수
 */
const initRouter = () => {
  render(window.location.pathname);

  window.addEventListener("popstate", () => {
    render(window.location.pathname);
  });

  document.body.addEventListener("click", (event) => {
    if (
      event.target.tagName === "A" &&
      event.target.getAttribute("href").startsWith("/")
    ) {
      event.preventDefault();
      const path = event.target.getAttribute("href");
      navigateTo(path);
    }
  });
};

initRouter();
