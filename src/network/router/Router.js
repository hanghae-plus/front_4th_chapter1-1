import MainPage from "@/pages/app";
import ErrorPage from "@/pages/error";
import LoginPage from "@/pages/login";
import ProfilePage from "@/pages/profile";
import userStore from "@/stores/UserStore";
import { log } from "@/util/common/log";

// TODO : 적절한 도메인으로 빼기

const STATIC_PAGES = {
  main: {
    path: "/",
    page: MainPage,
  },
  profile: {
    path: "/profile",
    guards: [
      () => {
        if (!userStore.getUser()) return "/login";
      },
    ],
    page: ProfilePage,
  },
  login: {
    path: "/login",
    guards: [
      () => {
        if (userStore.getUser()) return "/";
      },
    ],
    page: LoginPage,
  },
  logout: { path: "/logout", page: () => null },
  404: { path: "/404", page: ErrorPage },
};

class Router {
  static instance = null;
  constructor(isHash = false) {
    if (Router.instance) {
      return Router.instance;
    }
    this.isHash = isHash;
    Router.instance = this;
    this.routes = {};
    window.addEventListener("popstate", this._handlePopState);
  }

  // TO ASK : 동적으로 라우트를 추가할 일이 있을까? 프라이빗으로 선언해야할까?
  addRoute = (path, handler) => {
    this.routes[path] = handler;
  };

  // 해시 라우팅 on off 함수
  toggleHash = (fixed) => {
    this.isHash = fixed;
    if (this.isHash) {
      window.addEventListener("hashchange", this._handleRouteState);
    } else {
      window.removeEventListener("hashchange", this._handleRouteState);
    }
  };

  navigate = (path) => {
    if (this.isHash === true) {
      window.location.hash = path;
    }
    history.pushState({}, "", path);
    this.route(path);
  };

  route = (path) => {
    console.log(path, "path", this.isHash);
    const handler = this.routes[path];
    if (handler) {
      log(`Routing to ${path}`);
      handler();
    } else {
      log(`Cannot route to ${path}`);
      this.routes["/404"]();
    }
  };

  // popstate 발동 시 라우팅 해주는 함수(최초 인스턴스화 시에 이벤트 리스너로 등록)
  _handlePopState = () => {
    this.route(window.location.pathname);
  };

  _handleRouteState = () => {
    const path = this.isHash
      ? window.location.hash.replace("#", "")
      : window.location.pathname;

    this.route(path);
  };

  replaceBodyHtml = (render, ...guards) => {
    let skip = false;
    if (guards) {
      for (const guard of guards) {
        console.log(guards, "guards");
        const redirectPath = guard();
        console.log(redirectPath, "redirectPath");
        if (redirectPath) {
          this.navigate(redirectPath);
          skip = true;
          return;
        }
      }
    }
    !skip && render(document.body, "#root");
  };
}

const router = new Router(false);

// enumerable을 이용한 순회(배열을 만들지 않고 객체를 순회하여 최적화)
for (const key in STATIC_PAGES) {
  const value = STATIC_PAGES[key];
  router.addRoute(value.path, () => {
    value.guards
      ? router.replaceBodyHtml(value.page, ...value.guards)
      : router.replaceBodyHtml(value.page);
  });
}

export default router;
export { STATIC_PAGES };
