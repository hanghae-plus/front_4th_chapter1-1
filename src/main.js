import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/loginPage";
import { ErrorPage } from "./pages/ErrorPage";
import { Router } from "./router";

const router = Router();

router.addRoute("/", () => MainPage());
router.addRoute("/profile", () => ProfilePage());
router.addRoute("/login", () => LoginPage());
router.addRoute("/error", () => ErrorPage());

router.setDefaultRoute();

document.querySelector("nav").addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    router.navigateTo(e.target.pathname);
  }
});
