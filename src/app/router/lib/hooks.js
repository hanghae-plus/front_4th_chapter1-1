import { routerConfig } from "./config";
import { navigate } from "./navigate";

function useRouter() {
  return {
    navigate,
    getCurrentPath: () => {
      if (routerConfig.mode === "hash") {
        return window.location.hash.slice(1) || "/";
      }
      return window.location.pathname;
    },
    back: () => window.history.back(),
    forward: () => window.history.forward(),
  };
}

export { useRouter };
