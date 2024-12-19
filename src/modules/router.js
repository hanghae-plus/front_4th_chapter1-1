import { withObserver } from "../hof/withObserver";

// NOTE: pushState, replaceState를 최초 1회 오버라이드 하기 전에 원본을 백업해둡니다.
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
      const rawPathname = (location.hash || location.pathname).replace("#", "");

      const pathname = rawPathname.startsWith("/")
        ? rawPathname
        : `/${rawPathname}`;

      return routes[pathname] ?? fallback;
    },
  });

  window.addEventListener("popstate", () => {
    router.notify();
  });

  window.addEventListener("hashchange", () => {
    router.notify();
  });

  // 여러번 패치되는 것을 방지하기 위해 패치 완료 여부를 체크합니다.
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

  return router;
}
