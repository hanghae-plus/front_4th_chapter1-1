// History 속성
// 1. length Return
// 2. scrollRestoration
// 3. state

// History method
// 1. history.back() === history.go(-1)
// 2. history.go() 인수에 따라 상대적으로 동작함 -1, 0, 1
// 1. history.pushState() 스택에 추가
// 1. history.relaceState() 스택 최근 데이터로 대체

export const Router = {
  initialized: false,
  push: (url) => {
    !Router.initialized && Router.init();

    window.history.pushState(null, null, url);
  },
  replace: (url) => {
    !Router.initialized && Router.init();

    window.history.replaceState(null, null, url);
  },
  init: () => {
    Router.initialized = true;
    // Q: onPopState와 hashChange가 무엇이 다른거지?
    window.onpopstate = (event) => {
      console.log("URL 변경 감지:", event.state);
    };
  },
  get pathname() {
    return window.location.pathname;
  },
};
