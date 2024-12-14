import { Routes } from "../routes";

const createRouter = (container: HTMLElement, routes: Routes) => {
  const render = (path: string) => {
    const component = routes[path] || routes["*"];
    container.innerHTML = component();
  };

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    render(path);
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
        const path = target.getAttribute("href") || "/";
        navigate(path);
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
