import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { HistoryRouter, HashRouter } from "./utils/route";

// 라우터 초기화
const router = window.location.hash ? new HashRouter() : new HistoryRouter();

setAddRoute(router);
window.location.hash
  ? router.navigateTo(window.location.hash.slice(1))
  : router.navigateTo(window.location.pathname);

function setAddRoute(router) {
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
}

// 콘텐츠를 문서 본문에 로드하는 함수
function loadRoute(content) {
  document.getElementById("root").innerHTML = content;

  const userData = window.localStorage.getItem("user");

  if (content === MainPage()) {
    mainPageEventController(userData);
  } else if (content === ProfilePage()) {
    profilePageEventController(JSON.parse(userData));
  } else if (content === LoginPage()) {
    loginPageEventController();
  }
}

function mainPageEventController(userData) {
  navbarEventController();

  const loginBtn =
    document.getElementById("login") || document.getElementById("logout");
  const profileStatus = document.getElementById("user-profile");

  if (userData) {
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

    if (userData) {
      window.localStorage.clear();
      router.navigateTo("/");
    } else {
      router.navigateTo("/login");
    }
  });
}

function profilePageEventController(userJson) {
  navbarEventController();

  const { username, email, bio } = userJson;
  const profileForm = document.getElementById("profile-form");

  if (profileForm) {
    const idItem = profileForm.querySelector("#username");
    const emailItem = profileForm.querySelector("#email");
    const bioItem = profileForm.querySelector("#bio");
    const logoutBtn =
      document.getElementById("login") || document.getElementById("logout");

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

    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault(); // 기본 동작 방지 (필요시)

      if (userJson) {
        window.localStorage.clear();
        router.navigateTo("/");
      } else {
        router.navigateTo("/login");
      }
    });
  }
}

function loginPageEventController() {
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
        alert("아이디를 입력해주세요");
      }
    });
  }
}

// 전역 네비게이션 링크 클릭 처리
function navbarEventController() {
  const navbar = document.querySelector("nav");
  if (navbar) {
    navbar.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault(); // 기본 링크 클릭 동작을 막음
        const path = e.target.getAttribute("href");
        router.navigateTo(path);
      }
    });
  }
}
