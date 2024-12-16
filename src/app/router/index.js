import { useRouter } from "./lib/hooks";
import { routes } from "./routes";
function initRouter(rootElement) {
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
    router.navigate(event.target.href);
  };

  window.onpopstate = handleLocation;
  window.addEventListener("pushstate", handleLocation);
  window.addEventListener("popstate", handleLocation);

  window.route = handleRoute;

  handleLocation();
}

export { initRouter };
