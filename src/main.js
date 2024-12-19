import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { HistoryRouter } from "./utils/route";

const router = new HistoryRouter();

setAddRoute(router);

router.navigateTo(window.location.pathname);

// 로그인 인증 미들웨어 함수
function authMiddleware(isAuthRequired, callback) {
  return () => {
    const id = window.localStorage.getItem("user");

    if (isAuthRequired && !id) {
      // 인증이 필요한데 로그인이 안된 경우
      router.navigateTo("/login");
      return;
    }

    if (!isAuthRequired && id) {
      // 인증이 필요없는데 로그인이 된 경우 (예: 로그인 페이지)
      router.navigateTo("/");
      return;
    }

    callback();
  };
}

function setAddRoute(router) {
  router.addRoute(
    "/login",
    authMiddleware(false, () => loadRoute(LoginPage())),
  );
  router.addRoute(
    "/profile",
    authMiddleware(true, () => loadRoute(ProfilePage())),
  );
  router.addRoute("/", () => loadRoute(MainPage()));
  router.addRoute("/404", () => loadRoute(NotFoundPage()));
}

// 콘텐츠를 문서 본문에 로드하는 함수
function loadRoute(content) {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = content;

  mainPageController();
  profilePageController();
  loginPageController();
  buttonEventController();
}

function mainPageController() {
  const loginBtn =
    document.getElementById("login") || document.getElementById("logout");
  const profileStatus = document.getElementById("user-profile");
  const userData = window.localStorage.getItem("user");

  if (profileStatus) {
    if (userData) {
      loginBtn.textContent = "로그아웃";
      loginBtn.setAttribute("id", "logout");
      profileStatus.hidden = false;
    } else {
      loginBtn.textContent = "로그인";
      loginBtn.setAttribute("id", "login");
      profileStatus.hidden = true;
    }
  }
}

function profilePageController() {
  const userData = window.localStorage.getItem("user");
  const userJson = JSON.parse(userData);

  if (userJson) {
    const { username, email, bio } = userJson;

    const profileForm = document.getElementById("profile-form");

    if (profileForm) {
      const idItem = profileForm.querySelector("#username");
      const emailItem = profileForm.querySelector("#email");
      const bioItem = profileForm.querySelector("#bio");

      if (username) idItem.value = username;
      if (email) emailItem.value = email;
      if (bio) bioItem.value = bio;

      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const userStr = {
          username: idItem.value,
          email: emailItem.value,
          bio: bioItem.value,
        };

        window.localStorage.setItem("user", JSON.stringify(userStr));

        alert("프로필이 업데이트 되었습니다");
      });
    }
  }
}

function loginPageController() {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const userNm = loginForm.querySelector("#username").value;

      if (userNm) {
        const userJson = {
          username: userNm,
          email: "",
          bio: "",
        };

        window.localStorage.setItem("user", JSON.stringify(userJson));

        alert("로그인 되었습니다");

        router.navigateTo("/");
      } else {
        alert("아이디를 입력해주세요");
      }
    });
  }
}

function buttonEventController() {
  const userData = window.localStorage.getItem("user");
  const navbar = document.querySelector("nav");

  if (navbar) {
    navbar.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.tagName === "A") {
        if (["login", "logout"].includes(e.target.id)) {
          if (userData) {
            window.localStorage.clear();
            router.navigateTo("/login");
          } else {
            router.navigateTo("/login");
          }
        } else {
          const path = e.target.getAttribute("href");
          router.navigateTo(path);
        }
      }
    });
  }
}
