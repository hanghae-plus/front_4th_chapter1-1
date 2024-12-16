import { routerConfig } from "./lib/config";
import { useRouter } from "./lib/hooks";
import { routes } from "./routes";

function initRouter(rootElement, mode = "history") {
  routerConfig.mode = mode;
  const router = useRouter();

  const handleLocation = () => {
    const path = router.getCurrentPath();
    const route = routes[path] || routes[404];

    rootElement.innerHTML = "";
    rootElement.innerHTML = route();
  };

  const handleRoute = (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;

    event.preventDefault();
    const path = event.target.getAttribute("href");
    if (path) {
      if (routerConfig.mode === "hash") {
        router.navigate(path.replace("#", ""));
      } else {
        router.navigate(path);
      }
    }
  };

  window.addEventListener("hashchange", handleLocation);
  window.addEventListener("popstate", handleLocation);
  window.addEventListener("pushstate", handleLocation);
  window.addEventListener("load", handleLocation);

  window.route = handleRoute;

  handleLocation();
}

export { initRouter };
