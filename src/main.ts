import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import { MainPage } from "./pages/main";
import { ProfilePage } from "./pages/profile";
import { Router } from "./router";

const loginPage = new LoginPage(document.querySelector("#root")!);
const prifilePage = new ProfilePage(document.querySelector("#root")!);
const mainPage = new MainPage(document.querySelector("#root")!);

Router.createRoutes({
  route: {
    "/": () => mainPage.render(),
    "/profile": () => prifilePage.render(),
    "/login": () => loginPage.render(),
    "404": ErrorPage,
  },
  isHash: true,
});
