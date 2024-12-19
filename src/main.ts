import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import { MainPage } from "./pages/main";
import { ProfilePage } from "./pages/profile";
import { Router } from "./router";

const loginPage = new LoginPage(document.querySelector("#root")!);
const profilePage = new ProfilePage(document.querySelector("#root")!);
const mainPage = new MainPage(document.querySelector("#root")!);

Router.createRoutes({
  route: {
    "/": () => mainPage.render(),
    "/profile": () => profilePage.render(),
    "/login": () => loginPage.render(),
    "404": ErrorPage,
  },
  isHash: true,
});
