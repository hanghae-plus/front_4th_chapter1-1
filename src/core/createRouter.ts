import { Routes } from "../routes";

const createRouter = (container: HTMLElement, routes: Routes) => {
  const checkAuth = (pathname: string) => {
    const route = routes[pathname];
    if (route?.isProtectedRoute && !localStorage.getItem("user")) {
      navigate("/login");
      return "/login";
    }
    return pathname;
  };

  const render = (pathname: string) => {
    const checkedPath = checkAuth(pathname);
    const route = routes[checkedPath] || routes["*"];
    container.innerHTML = route.component();
    route.setUp();
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

      if (target.matches("[data-link]")) {
        e.preventDefault();
        const pathname = target.getAttribute("href") || "/";
        navigate(pathname);
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
