import { userService } from "../services/userService";
import { Router } from "../Router";

export const Header = () => {
  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    ${
      window.location.pathname === "/login"
        ? ""
        : `
        <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${window.location.pathname === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
          ${window.location.pathname === "profile" || userService.isLogin() ? `<li><a href="/profile" class="${window.location.pathname === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>` : ""}
          <li><a href="#" class="text-gray-600" id="${userService.isLogin() ? "logout" : "login"}">${userService.isLogin() ? "로그아웃" : "로그인"}</a></li>
        </ul>
        </nav>
      `
    }
  `;
};

Header.init = () => {
  const lotoutButton = document.getElementById("logout");
  if (lotoutButton) {
    lotoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      userService.logout();
      Router.push("/login");
    });
  }

  const loginButton = document.getElementById("login");
  if (loginButton) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      Router.push("/login");
    });
  }
};
