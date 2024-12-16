import { routes } from "../routes";
import { routerConfig } from "./config";
function navigate(to, replace = false) {
  if (routerConfig.mode === "hash") {
    const hashPath = `#${to}`;
    if (replace) {
      window.location.replace(hashPath);
    } else {
      window.location.hash = to;
    }
    return;
  }

  if (replace) {
    window.history.replaceState({}, "", to);
  } else {
    window.history.pushState({}, "", to);
  }

  const handleRouteChange = () => {
    const rootElement = document.getElementById("root");
    if (!rootElement) return;

    const route = routes[to] || routes[404];
    rootElement.innerHTML = "";
    rootElement.innerHTML = route();
  };

  handleRouteChange();
  window.dispatchEvent(new Event("pushstate"));
}

export { navigate };
