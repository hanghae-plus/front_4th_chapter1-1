import MainPage from "./page/main";
import ProfilePage from "./page/profile";
import LoginPage from "./page/login";
import ErrorPage from "./page/error";
import Router from "./router";

(function (global) {
  function $(selector) {
    return document.querySelector(selector);
  }

  global.$ = $;
})(window);

const app = () => {
  const routerMap = {
    "/": { component: MainPage },
    "/profile": { component: ProfilePage, authRequired: true },
    "/login": { component: LoginPage },
    "/error": { component: ErrorPage },
  };

  const router = new Router(routerMap);
  const currentPath = window.location.pathname;
  router.push(currentPath);
};

app();

$("#root").addEventListener("click", (event) => {
  const router = new Router();
  const target = event.target;

  if (target.id === "logout") {
    event.preventDefault(); // 기본 동작 막기
    localStorage.removeItem("user");
    router.push("/");
    return;
  }

  if (event.target.tagName === "A") {
    event.preventDefault(); // 기본 동작 막기

    const path = event.target.getAttribute("href");
    router.push(path);
    return;
  }
});

$("#root").addEventListener("submit", (event) => {
  event.preventDefault();
  const router = new Router();
  const target = event.target;
  const formData = new FormData(target);

  switch (target.id) {
    case "login-form":
      {
        const { username } = Object.fromEntries(formData);
        if (username) {
          const user = {
            username,
            email: "",
            bio: "",
          };
          localStorage.setItem("user", JSON.stringify(user));

          router.push("/profile");
        }
      }
      break;
    case "profile-form":
      {
        const { username, email, bio } = Object.fromEntries(formData);
        if (username) {
          const user = {
            username,
            email,
            bio,
          };
          localStorage.setItem("user", JSON.stringify(user));
        }
      }
      break;
  }
});
