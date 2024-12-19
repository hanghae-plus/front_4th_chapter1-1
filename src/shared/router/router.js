// History 속성
// 1. length Return
// 2. scrollRestoration
// 3. state

// History method
// 1. history.back() === history.go(-1)
// 2. history.go() 인수에 따라 상대적으로 동작함 -1, 0, 1
// 1. history.pushState() 스택에 추가
// 1. history.relaceState() 스택 최근 데이터로 대체

function preventDefaultATagLogic({ callback = () => {} }) {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const url = event.target.getAttribute("href");
      MyRouter.push(url);

      callback();
    });
  });
}

export const MyRouter = {
  callback: null,
  push: (url) => {
    window.history.pushState({}, "", url);
    MyRouter.callback?.();
  },

  replace: (url) => {
    window.history.replaceState({}, "", url);
    MyRouter.callback?.();
  },

  init: ({ callback = () => {} }) => {
    MyRouter.callback = callback;
    preventDefaultATagLogic({ callback });

    window.onpopstate = () => {
      callback();
    };
  },

  get pathname() {
    return window.location.pathname;
  },
};
