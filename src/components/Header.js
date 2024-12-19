import { user } from "../services/user";
import { getPathname } from "../utils/getPathname";

export const Header = {
  register: ({ router }) => {
    const logoutButton = document.getElementById("logout");
    if (logoutButton == null) {
      return;
    }

    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      user.logout();
      router.push("/login");
      return;
    });
  },
  render: () => {
    const isLogin = user.isLogin();
    const activeStyle = "text-blue-600 font-bold";
    const deactiveStyle = "text-gray-600";
    const activeWhen = (x) =>
      x === getPathname() ? activeStyle : deactiveStyle;

    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14" aria-role="navigation" >
        <ul class="flex justify-around">
          <li><a href="/" class="${activeWhen("/")}">홈</a></li>
          ${isLogin ? `<li><a href="/profile" class="${activeWhen("/profile")}">프로필</a></li>` : ""}
          ${
            isLogin
              ? `<li><a href="#" class="text-gray-600" id="logout">로그아웃</a></li>`
              : `<li><a href="/login" class="text-gray-600" id="login">로그인</a></li>`
          }
        </ul>
      </nav>
    `;
  },
};
