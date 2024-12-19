import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";

class Router {
    constructor() {
        this.setRoute();
        this.isLoggedIn = !!localStorage.getItem("user");
        window.addEventListener("popstate", this.handlePopState.bind(this));
    }

    setRoute() {
        this.isLoggedIn = !!localStorage.getItem("user");
        this.routes = [
            { path: "/", page: MainPage },
            { path: "/profile", page: ProfilePage },
            { path: "/login",  page: LoginPage}
        ]
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigateTo(path) {        
        history.pushState(null, null, path);
        this.handleRoute(path);
    }

    handlePopState() {
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        const route = this.routes.find((route) => route.path === path);
        const $root = document.querySelector("#root");

        if (path === "/profile" && !localStorage.getItem("user")) {
            this.navigateTo("/login");
            return;
        } else if (path === "/logout") {
            this.handleLogout();
            return;
        } else if (route && route.page) {
            new route.page($root);
        } else {
            new ErrorPage($root);
        }
    }

    handleLogout() {
        localStorage.removeItem("user");  
        this.setRoute(); 
        this.navigateTo("/login");
    }

    getRoutes() {
        return this.routes;
    }
}

export default Router;