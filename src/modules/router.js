import { withObserver } from "../hof/withObserver";

window.history.originalPushState =
  window.history.originalPushState ?? window.history.pushState;
window.history.originalReplaceState =
  window.history.originalReplaceState ?? window.history.replaceState;

export function createRouter({ routes = {}, fallback = null } = {}) {
  const location = window.location;

  const router = withObserver({
    push: (url) => {
      window.history.pushState({}, "", url);
    },

    replace: (url) => {
      window.history.replaceState({}, "", url);
    },

    matchRoute: () => {
      let pathname = (location.hash || location.pathname)
        .replace("/#", "")
        .replace("#", "");

      pathname = pathname.startsWith("/") ? pathname : `/${pathname}`;

      const result = routes[pathname] ?? fallback;

      return result;
    },
  });

  window.addEventListener("popstate", () => {
    router.notify();
  });

  if (!window.__historyStatePatched) {
    window.history.pushState = function () {
      window.history.originalPushState.apply(this, arguments);
      router.notify();
    };

    window.history.replaceState = function () {
      window.history.originalReplaceState.apply(this, arguments);
      router.notify();
    };
    // 이미 패치 완료 표시
    window.__historyStatePatched = true;
  }

  window.addEventListener("hashchange", () => {
    router.notify();
  });

  return router;
}
