import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { setUser, getUser, deleteUser } from "./store/useState.js";

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

const hashRoutes = {
  "#/": () => MainPage(),
  "#/profile": () => ProfilePage(),
  "#/login": () => LoginPage(),
  404: () => NotFoundPage(),
};

const router = createRouter(routes);
const hashRouter = createRouter(hashRoutes);

function updateContent() {
  let path = window.location.pathname;
  let hash = window.location.hash;
  const user = getUser();

  // 로그인된 사용자가 로그인 페이지 접근 시 메인 페이지로 리다이렉트
  if (user && (path === "/login" || hash === "#/login")) {
    if (hash) {
      renderHash("#/");
    } else {
      render("/");
    }
    return;
  }

  // 비로그인 사용자가 /profile 경로 접근 시 로그인 페이지로 리다이렉트
  if (!user && (path === "/profile" || hash === "#/profile")) {
    if (hash) {
      renderHash("#/login");
    } else {
      render("/login");
    }
    return; // 추가 렌더링 방지
  }

  if (hash) {
    renderHash(hash);
  } else {
    render(path);
  }

  // 프로필 페이지인 경우 사용자 정보 렌더링
  if ((path === "/profile" || hash === "#/profile") && user) {
    const { username, email, bio } = user;
    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("bio").value = bio;
  }
}

// submit 이벤트 처리 함수
function handleSubmitEvent(event) {
  event.preventDefault();

  const target = event.target; // 이벤트가 발생한 요소
  const isHashRouting = window.location.hash !== ""; // 해시 라우팅 여부 확인

  // 로그인 이벤트 처리
  if (target.id === "login-form") {
    const username = document.getElementById("username").value;

    // 로컬스토리지에 저장
    if (username) {
      setUser({ username, email: "", bio: "" });

      updateContent();

      if (isHashRouting) {
        renderHash("#/profile");
      } else {
        render("/profile");
      }
    } else {
      console.error("사용자 ID 또는 비밀번호가 비어 있습니다.");
    }
  } else if (target.id === "profile-form") {
    // 프로필 업데이트 이벤트 처리
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    setUser({ username, email, bio });
  }
}

// 클릭 이벤트 처리
function handleClickEvent(event) {
  if (event.target.type === "submit") return;
  event.preventDefault();

  const target = event.target; // 이벤트가 발생한 요소
  const isHashRouting = window.location.hash !== ""; // 해시 라우팅 여부 확인

  if (target.id === "logout") {
    logout(isHashRouting);
  } else if (target.id === "profile") {
    moveToProfile(isHashRouting);
  } else if (target.id === "home") {
    moveToHome(isHashRouting);
  }
}

function logout(isHashRouting) {
  deleteUser();
  if (isHashRouting) {
    renderHash("#/login");
  } else {
    render("/login");
  }
}

function moveToProfile(isHashRouting) {
  if (isHashRouting) {
    renderHash("#/profile");
  } else {
    render("/profile");
  }

  const user = getUser();

  if (!user) {
    console.error("사용자 정보가 없습니다.");
    return;
  }

  // 사용자 정보 입력
  const usernameField = document.getElementById("username");
  const emailField = document.getElementById("email");
  const bioField = document.getElementById("bio");

  if (usernameField) usernameField.value = JSON.parse(user).username || "";
  if (emailField) emailField.value = JSON.parse(user).email || "";
  if (bioField) bioField.value = JSON.parse(user).bio || "";
}

function moveToHome(isHashRouting) {
  if (isHashRouting) {
    renderHash("#/");
  } else {
    render("/");
  }
}

// 렌더 함수
function render(path) {
  console.log("path", path);
  window.history.pushState(null, "", path);
  document.getElementById("root").innerHTML = router(path);
}

function renderHash(hash) {
  window.history.pushState(null, "", hash);
  document.getElementById("root").innerHTML = hashRouter(hash);
}

const root = document.getElementById("root");
root.removeEventListener("submit", handleSubmitEvent);
root.addEventListener("submit", handleSubmitEvent);

// 클릭 이벤트도 정리 후 추가
root.removeEventListener("click", handleClickEvent);
root.addEventListener("click", handleClickEvent);

window.addEventListener("hashchange", updateContent);
window.addEventListener("popstate", updateContent);
window.addEventListener("load", updateContent);
