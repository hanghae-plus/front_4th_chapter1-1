import { Routes } from "../routes";

const createRouter = (container: HTMLElement, routes: Routes) => {
  const checkAuth = (pathname: string) => {
    const route = routes[pathname];
    if (route?.isProtectedRoute && !localStorage.getItem("user")) {
      navigate("/login");
      return "/login";
    }
    if (pathname === "/login" && !!localStorage.getItem("user")) {
      navigate("/");
      return "/";
    }
    return pathname;
  };

  const render = (pathname: string) => {
    const checkedPath = checkAuth(pathname);
    const route = routes[checkedPath] || routes["*"];
    container.innerHTML = route.component();
    route.setUp && route.setUp();
  };

  const navigate = (pathname: string) => {
    window.history.pushState({}, "", pathname);
    render(pathname);
  };

  const init = () => {
    render(window.location.pathname);

    window.addEventListener("popstate", () => {
      render(window.location.pathname);
    });

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      const linkElement = target.closest("[data-link]");
      if (linkElement instanceof HTMLElement) {
        e.preventDefault();
        const pathname = linkElement.getAttribute("href") || "/";
        navigate(pathname);
        return;
      }

      const logoutButton = target.closest('[data-action="logout"]');
      if (logoutButton) {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
    });
  };

  return {
    render,
    navigate,
    init,
  };
};

export default createRouter;
