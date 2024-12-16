import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function createRouter(routes) {
  return function (path) {
    const route = routes[path] || routes["404"];
    return route();
  };
}

const routes = {
  "/": () => MainPage(),
  "/profile": () => ProfilePage(),
  "/login": () => LoginPage(),
  404: () => NotFoundPage(),
};

const router = createRouter(routes);

function updateContent() {
  // 렌더링
  let path = window.location.pathname;
  const user = localStorage.getItem("user");

  // 로그인되지 않은 상태에서 /profile 경로로 접근하면 로그인 페이지로 리다이렉션
  if (!user && path === "/profile") {
    path = "/login";
  }

  // 기본 라우팅
  render(path);

  const root = document.getElementById("root");
  root.addEventListener("submit", handleSubmitEvent);
  root.addEventListener("click", handelClickEvent);

  // /profile 경로인 경우 사용자 정보 렌더링
  if (path === "/profile" && user) {
    render("/profile");
    const { username, email, bio } = JSON.parse(localStorage.getItem("user"));

    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("bio").value = bio;
  }
}

// submit 이벤트 처리 함수
function handleSubmitEvent(event) {
  event.preventDefault();

  const target = event.target; // 이벤트가 발생한 요소

  // 로그인 이벤트 처리
  if (target.id === "login-form") {
    const username = document.getElementById("username").value;

    // 로컬스토리지에 저장
    if (username) {
      localStorage.setItem(
        "user", // 'user'라는 키로 저장
        JSON.stringify({ username, email: "", bio: "" }),
      );

      render("/profile");
      updateContent();
    } else {
      console.error("사용자 ID 또는 비밀번호가 비어 있습니다.");
    }
  } else if (target.id === "profile-form") {
    // 프로필 업데이트 이벤트 처리
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    localStorage.setItem(
      "user", // 'user'라는 키로 저장
      JSON.stringify({ username, email, bio }),
    );
  }
}

// 클릭 이벤트 처리
function handelClickEvent(event) {
  event.preventDefault();

  const target = event.target; // 이벤트가 발생한 요소
  if (target.id === "logout") {
    logout();
  }
}

function logout() {
  localStorage.removeItem("user");
  render("/login");
}

// 렌더 함수
function render(path) {
  window.history.pushState(null, "", path);
  document.getElementById("root").innerHTML = router(path);
}

window.addEventListener("popstate", updateContent);
window.addEventListener("load", updateContent);
