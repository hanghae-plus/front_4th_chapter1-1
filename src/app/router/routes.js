// src/app/router/routes.js
import { ErrorPage } from "../../pages/error";
import { LoginPage } from "../../pages/login";
import { MainPage } from "../../pages/main";
import { ProfilePage } from "../../pages/profile";
import { MainLayout } from "../layout/main-layout";
import { useRouter } from "./lib/hooks";

function authGuard(router, Component) {
  if (!localStorage.getItem("user")) {
    router.navigate("/login");
    return LoginPage();
  }
  return Component;
}

function protectedRoute(router, Component) {
  if (localStorage.getItem("user")) {
    router.navigate("/");
    return MainLayout(MainPage());
  }
  return Component;
}

// src/app/router/routes.js
const routes = {
  404: ErrorPage,
  "/": () => MainLayout(MainPage()),
  "/login": () => {
    const router = useRouter();
    return protectedRoute(router, LoginPage());
  },
  "/profile": () => {
    const router = useRouter();
    return authGuard(router, MainLayout(ProfilePage()));
  },
};

export { routes };
