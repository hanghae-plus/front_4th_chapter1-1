import { userService } from "../services/userService";
import { SPARouter } from "../SPARouter";

export const Header = () => {
  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${SPARouter.pathname === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
      ${SPARouter.pathname === "profile" || userService.isLogin() ? `<li><a href="/profile" class="${SPARouter.pathname === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>` : ""}
      <li><a href="#" class="text-gray-600">${userService.isLogin() ? "로그아웃" : "로그인"}</a></li>
    </ul>
    </nav>
  `;
};

Header.init = () => {
  const allATag = document.querySelectorAll("a");
  for (const logoutButton of allATag) {
    if (logoutButton.innerText !== "로그아웃") {
      continue;
    }

    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      userService.logout();
      SPARouter.push("/");
    });
  }

  for (const loginButton of allATag) {
    if (loginButton.innerText !== "로그인") {
      continue;
    }

    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      SPARouter.push("/login");
    });
  }
};
