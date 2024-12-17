import { authGuard } from "./guard/authGuard";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { HashRouter } from "./router";
import { authStore } from "./store/AuthStore";
import { renderPage } from "./util/render";

//router만 해시라우터로 변경
const route = new HashRouter();

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
route.registerRoute("#/", renderHomePage);
route.registerRoute("#/login", renderLoginPage);
route.registerRoute("#/profile", renderProfilePage);

// 현재 경로에 맞게 페이지 렌더링
route.setting();

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

function loginHandler(formData) {
  const username = formData.get("username");

  authStore.setUser({ username, email: "", bio: "" });
  location.hash = "#/profile";
}

function updateProfileHandler(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const bio = formData.get("bio");
  authStore.setUser({ username, email, bio });
}
