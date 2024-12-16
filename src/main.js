import { authGuard } from "./guard/authGuard";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Router } from "./router";
import { useAuth } from "./store/useAuth";

const route = new Router();
const auth = new useAuth();

const renderLoginPage = () => {
  authGuard(
    () => {
      document.getElementById("root").innerHTML = HomePage();
      route.navigate("/");
    },
    () => {
      document.getElementById("root").innerHTML = LoginPage();
    },
  );
};

const renderHomePage = () => {
  document.getElementById("root").innerHTML = HomePage();
};

const renderProfilePage = () => {
  authGuard(
    () => {
      document.getElementById("root").innerHTML = ProfilePage();
    },
    () => {
      document.getElementById("root").innerHTML = LoginPage();
      route.navigate("/login");
    },
  );
};

//라우팅 등록
route.registerRoute("/", renderHomePage);
route.registerRoute("/login", renderLoginPage);
route.registerRoute("/profile", renderProfilePage);

//현재 패스에 대한 페이지 렌더
route.setting();

// 전역 click 이벤트 리스너 추가
document.body.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName === "A") {
    event.preventDefault();
    const path = target.getAttribute("href");

    if (path === "#") {
      auth.logOut();
      route.navigate("/login");
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

  if (id === "login-form") {
    loginHandler(formData);
  } else if (id === "profile-form") {
    updateProfileHandler(formData);
  }
});

function loginHandler(formData) {
  const username = formData.get("username");

  auth.login({ username, email: "", bio: "" });
  route.navigate("/profile");
}

function updateProfileHandler(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const bio = formData.get("bio");

  auth.login({ username, email, bio });
}
