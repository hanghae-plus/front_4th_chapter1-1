import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";

class Router {
    constructor() {
        this.updateRoute();
        this.isLoggedIn = !!localStorage.getItem("user");
        window.addEventListener("popstate", this.handlePopState.bind(this));
    }

    updateRoute() {
        this.isLoggedIn = !!localStorage.getItem("user");
        this.routes = this.isLoggedIn ? [
            { path: "/", name: "홈", id: "home", page: MainPage },
            { path: "/profile", name: "프로필", id: "profile", page: ProfilePage },
            { path: "/login", name: "로그아웃", id: "logout", page: LoginPage }
        ] : [
            { path: "/", name: "홈", id: "home", page: MainPage },
            { path: "/login", name: "로그인", id: "login", page: LoginPage }
        ];
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigateTo(path) {        
        if (path === "/login" && this.isLoggedIn) {
            localStorage.removeItem("user");
            this.updateRoute();
            this.handleRoute("/login");
        }

        this.updateRoute();
        history.pushState(null, null, path);
        this.handleRoute(path);
    }

    handlePopState() {
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        const route = this.routes.find((route) => route.path === path);
        const $root = document.querySelector("#root");

        if (path === "/profile" && !this.isLoggedIn) {
            history.pushState(null, null, "/login")
        } else if (route && route.page) {
            new route.page($root);
        } else {
            new ErrorPage($root);
        }
    }

    getRoutes() {
        return this.routes;
    }
}

export default Router;