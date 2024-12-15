import { authGuard } from "./guard/authGuard";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Router } from "./router";
import { useAuth } from "./store/useAuth";

const route = new Router();
const auth = new useAuth();

const renderLoginPage = () => {
  document.body.innerHTML = LoginPage();
};

const renderHomePage = () => {
  document.body.innerHTML = HomePage();
};

const renderProfilePage = () => {
  authGuard(
    () => {
      document.body.innerHTML = ProfilePage();
    },
    () => {
      document.body.innerHTML = LoginPage();
      route.navigate("/login");
    },
  );
};

//라우팅 등록
route.registerRoute("/", renderHomePage);
route.registerRoute("/login", renderLoginPage);
route.registerRoute("/profile", renderProfilePage);

//현재 패스에 대한 페이지 렌더
route.setting(location.pathname);

// 전역 click 이벤트 리스너 추가
document.body.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName === "A") {
    event.preventDefault();
    const path = target.getAttribute("href");

    if (path === "#") {
      auth.logOut();
      route.navigate("/");
      return;
    }

    if (path) {
      route.navigate(path);
    }
  }
});

// 전역 submit 이벤트 리스너 추가
document.body.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const { id } = form;

  console.log(id);
  if (id === "login-form") {
    loginHandler(formData);
  }
});

function loginHandler(formData) {
  const username = formData.get("username");

  auth.login({ username, email: "", bio: "" });
  route.navigate("/profile");
}
