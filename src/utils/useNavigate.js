import { Layout } from "../components/Layout";
import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/Login";
import { NotFoundPage } from "../pages/NotFound";
import { ProfilePage } from "../pages/Profile";

// 기본 라우팅 설정
const routes = [
  { path: "/", element: HomePage, useLayout: true },
  { path: "/login", element: LoginPage, useLayout: false },
  { path: "/profile", element: ProfilePage, useLayout: true },
  { path: "/not-found", element: NotFoundPage, useLayout: false },
];

export const Router = (() => {
  const findComponent = (path) =>
    routes.find((route) => route.path === path)?.element || NotFoundPage;

  return { findComponent };
})();

// 해시 라우터를 처리하는 함수
export const useNavigate = () => {
  const rootElement = document.querySelector("#root");

  const renderContent = (path) => {
    const route = routes.find((route) => route.path === path);
    const Component = Router.findComponent(path);

    if (rootElement) {
      rootElement.innerHTML = route?.useLayout
        ? Layout(Component.render())
        : Component.render();

      if (Component?.onMount) {
        Component.onMount();
      }
    }
  };

  const navigate = (path) => {
    // 해시가 있을 때만 해시 라우팅을 처리
    const hashPath = location.hash.slice(1) || path;

    renderContent(hashPath);
    // 해시 라우팅에 맞춰 history 업데이트
    window.history.pushState({}, "", `#${hashPath}`);
  };

  return { navigate, renderPage: renderContent };
};
