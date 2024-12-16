import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import { MainPage } from "./pages/main";
import { ProfilePage } from "./pages/profile";
import { Router } from "./utils/router";

const loginPage = new LoginPage(document.querySelector("#root")!);

Router.addRoute("/", MainPage);
Router.addRoute("/profile", ProfilePage);
Router.addRoute("/login", loginPage.render);
Router.addRoute("404", ErrorPage);
Router.init();
