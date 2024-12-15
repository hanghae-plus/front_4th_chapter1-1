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

    if (path) {
      route.navigate(path);
    }
  }
});

// 전역 submit 이벤트 리스너 추가
document.body.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const id = event.submitter.id;
  if (id === "login-form") {
    loginHandler(form);
  }
});

function loginHandler(form) {
  const idInput = form.querySelector("input[type='text']");
  const passwordInput = form.querySelector("input[type='password']");

  const id = idInput.value;
  const password = passwordInput.value;

  const info = { id: id, password: password };
  auth.login(info);
  route.navigate("/");
}
