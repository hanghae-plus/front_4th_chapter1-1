import { userManager } from "../utils/user";

export const Header =
  () => `<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
     `;

export const Navigation = () => {
  const isLogin = userManager.isLogin();

  return `<nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" id="homeLink">홈</a></li>
      <li>${isLogin ? '<a href="/profile" id="profile">프로필</a>' : '<a href="/login" id="login">로그인</a>'}</li>
      ${isLogin ? '<li><a id="logout" href="#">로그아웃</a></li>' : ""}
    </ul>
  </nav>`;
};
export const Footer =
  () => `<div id="footerWrapper"><footer class="bg-gray-200 p-4 text-center" id="footerSection">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer></div>`;
