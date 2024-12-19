import { authGuard } from "./guard/authGuard";
import { loginHandler } from "./handler/LoginHandler";
import { updateProfileHandler } from "./handler/ProfileHandler";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { hashRoute } from "./router";
import { authStore } from "./store/AuthStore";
import { renderPage } from "./util/render";

const renderLoginPage = () => {
  authGuard(
    () => {
      renderPage(HomePage);
      location.hash = "#/";
    },
    () => {
      renderPage(LoginPage);
    },
  );
};

const renderHomePage = () => {
  renderPage(HomePage);
};

const renderProfilePage = () => {
  authGuard(
    () => {
      renderPage(ProfilePage);
    },
    () => {
      renderPage(LoginPage);
      location.hash = "#/login";
    },
  );
};

// 라우팅 등록
hashRoute.registerRoute("#/", renderHomePage);
hashRoute.registerRoute("#/login", renderLoginPage);
hashRoute.registerRoute("#/profile", renderProfilePage);

// 현재 경로에 맞게 페이지 렌더링
hashRoute.setting();

// 전역 click 이벤트 리스너 추가
document.body.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName === "A") {
    event.preventDefault();
    const path = target.getAttribute("href");

    if (path === "#") {
      authStore.clearUser();
      location.hash = "#/login";
      return;
    }

    if (path) {
      location.hash = `#${path}`;
    }
  }
});

// 전역 submit 이벤트 리스너 추가
document.body.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const { id } = form;

  if (id === "login-form") {
    loginHandler(formData);
  } else if (id === "profile-form") {
    updateProfileHandler(formData);
  }
});
