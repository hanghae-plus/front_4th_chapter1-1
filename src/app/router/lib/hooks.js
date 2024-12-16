import { navigate } from "./navigate";

function useRouter() {
  return {
    navigate,
    getCurrentPath: () => window.location.pathname,
    back: () => window.history.back(),
    forward: () => window.history.forward(),
  };
}

export { useRouter };
