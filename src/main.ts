import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import { MainPage } from "./pages/main";
import { ProfilePage } from "./pages/profile";
import { Router } from "./utils/router";

const loginPage = new LoginPage(document.querySelector("#root")!);
const prifilePage = new ProfilePage(document.querySelector("#root")!);
const mainPage = new MainPage(document.querySelector("#root")!);

Router.addRoute("/", () => mainPage.render());
Router.addRoute("/profile", () => prifilePage.render());
Router.addRoute("/login", () => loginPage.render());
Router.addRoute("404", ErrorPage);
Router.init();
