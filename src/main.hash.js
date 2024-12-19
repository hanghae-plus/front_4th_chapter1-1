// import "./main.js";
import { ErrorPage } from "./page/error.js";
import { HomePage } from "./page/home.js";
import { LoginPage } from "./page/login.js";
import { ProfilePage } from "./page/profile.js";
import { HashRouter } from "./router/router.js";
import { Store } from "./store/store.js";

const hashRouter = new HashRouter();
const store = new Store();

const root = document.getElementById("root");

// 처음 들어왔을때 url에 해시가 없으면 해시 추가해주기
if (!window.location.hash) {
  window.location.replace(window.location.href + "#/");
}

hashRouter.addRoute("/", () => {
  root.innerHTML = HomePage();

  const login = document.querySelector("#login-link");
  if (login) {
    login.addEventListener("click", (e) => {
      e.preventDefault();
      const basePath = `${window.location.pathname}#`;
      hashRouter.navigateTo(basePath + "/login");
    });
  }

  // 로그아웃
  logout();
});

// Login Page
hashRouter.addRoute("/login", () => {
  root.innerHTML = LoginPage();
  const user = store.getState();
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    const username = document.getElementById("username");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = {
        username: username.value,
        email: "",
        bio: "",
      };
      store.setState(user);
      hashRouter.navigateTo("/profile");
    });
  }

  if (user) {
    hashRouter.navigateTo("/");
  }
});

// Profile Page
hashRouter.addRoute("/profile", () => {
  const user = store.getState();

  if (!user) {
    hashRouter.navigateTo("/login");
    return;
  }

  root.innerHTML = ProfilePage(user);

  const form = document.querySelector("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const bio = document.getElementById("bio");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userUpdate = {
      username: username.value,
      email: email.value,
      bio: bio.value,
    };
    store.setState(userUpdate);

    hashRouter.navigateTo("/profile");
    alert("프로필이 업데이트되었습니다.");
  });

  username.value = user.username || "";
  email.value = user.email || "";
  bio.value = user.bio || "";

  // 로그아웃
  logout();
});

// 404 Page
hashRouter.addRoute("/404", () => {
  root.innerHTML = ErrorPage();
});

function logout() {
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "logout") {
      e.preventDefault();
      store.deleteState();
      hashRouter.navigateTo("/login");
    }
  });
}

// 현재 url 라우팅 처리하기
hashRouter.handleRoute(window.location.href);
