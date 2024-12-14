import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Router } from "./router";

const route = new Router();
const renderHomePage = () => {
  document.body.innerHTML = HomePage();
};

const renderLoginPage = () => {
  document.body.innerHTML = LoginPage();
};

const renderProfilePage = () => {
  document.body.innerHTML = ProfilePage();
};

//라우팅 등록
route.registerRoute("/", renderHomePage);
route.registerRoute("/login", renderLoginPage);
route.registerRoute("/profile", renderProfilePage);

//현재 패스에 대한 페이지 렌더
route.setting(location.pathname);
