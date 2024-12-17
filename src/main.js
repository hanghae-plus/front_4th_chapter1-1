import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

import { navClick } from "./utils/event";
import Router from "./utils/route";

// 라우터 초기화
const router = new Router();

// 경로와 그에 대응하는 핸들러 추가
router.addRoute("/", () => loadRoute(MainPage())); // 메인 페이지
router.addRoute("/profile", () => {
  const id = window.localStorage.getItem("user");

  if (id) loadRoute(ProfilePage());
  else router.navigateTo("/login");
}); // 프로필 페이지
router.addRoute("/login", () => {
  const id = window.localStorage.getItem("user");

  if (id) router.navigateTo("/");
  else loadRoute(LoginPage());
});
router.addRoute("/404", () => loadRoute(NotFoundPage())); // 에러 페이지

router.navigateTo(window.location.pathname);

navClick(router);

// 콘텐츠를 문서 본문에 로드하는 함수
function loadRoute(content) {
  document.getElementById("root").innerHTML = content;

  const id = window.localStorage.getItem("user");

  if (content === MainPage()) {
    const loginBtn =
      document.getElementById("login") || document.getElementById("logout");
    const profileStatus = document.getElementById("user-profile");

    if (id) {
      loginBtn.textContent = "로그아웃";
      loginBtn.setAttribute("id", "logout");
      profileStatus.hidden = false;
    } else {
      loginBtn.textContent = "로그인";
      loginBtn.setAttribute("id", "login");
      profileStatus.hidden = true;
    }

    loginBtn.addEventListener("click", (e) => {
      e.preventDefault(); // 기본 동작 방지 (필요시)

      if (id) {
        window.localStorage.clear();
        router.navigateTo("/");
      } else {
        router.navigateTo("/login");
      }
    });
  } else if (content === ProfilePage()) {
    const userJson = JSON.parse(window.localStorage.getItem("user"));

    const username = userJson.username;
    const email = userJson.email;
    const bio = userJson.bio;

    const logoutBtn =
      document.getElementById("login") || document.getElementById("logout");
    const profileForm = document.getElementById("profile-form");
    const idItem = profileForm.querySelector("#username");
    const emailItem = profileForm.querySelector("#email");
    const bioItem = profileForm.querySelector("#bio");

    if (profileForm) {
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

    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault(); // 기본 동작 방지 (필요시)

      if (id) {
        window.localStorage.clear();
        router.navigateTo("/");
      } else {
        router.navigateTo("/login");
      }
    });
  } else if (content === LoginPage()) {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = loginForm.querySelector("#username").value;

        if (id) {
          const userJson = {
            username: id,
            email: "",
            bio: "",
          };

          window.localStorage.setItem("user", JSON.stringify(userJson));

          alert("로그인 되었습니다");

          router.navigateTo("/");
        } else {
          alert("아이디 / 패스워드를 입력해주세요");
        }
      });
    }
  }
}
