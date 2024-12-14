import { userService } from "../services/userService";
import { Router } from "../Router";
import { getPathname } from "../utils/getPathname";

export const Header = () => {
  const isLogin = userService.isLogin();
  const activeStyle = "text-blue-600";
  const deactiveStyle = "text-gray-600";
  const activeWhen = (x) => (x === getPathname() ? activeStyle : deactiveStyle);

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${activeWhen("/")}">홈</a></li>
      ${isLogin ? `<li><a href="/profile" class="${activeWhen("/profile")}">프로필</a></li>` : ""}
      ${
        isLogin
          ? `<li><a href="#" class="text-gray-600" id="logout">로그아웃</a></li>`
          : `<li><a href="#" class="text-gray-600" id="login">로그인</a></li>`
      }
    </ul>
    </nav>
  `;
};

Header.init = () => {
  const logoutButton = document.getElementById("logout");
  logoutButton?.addEventListener("click", (e) => {
    e.preventDefault();
    userService.logout();
    Router.push("/login");
  });

  const loginButton = document.getElementById("login");
  loginButton?.addEventListener("click", (e) => {
    e.preventDefault();
    Router.push("/login");
  });
};
