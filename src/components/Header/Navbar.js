import { checkLogin } from "../../utils/index.js";

export const Navbar = () => {
  const isLogin = checkLogin();
  const logoutButton = `<li><a href="#" id='logout-button' class="text-gray-600">로그아웃</a></li>`;
  const loginButton = `<li><a href="#" id='login-button' class="text-gray-600">로그인</a></li>`;

  return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a href="/profile" class="text-gray-600">프로필</a></li>
          ${isLogin ? logoutButton : loginButton}
        </ul>
      </nav>
`;
};
