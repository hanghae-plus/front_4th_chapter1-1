import { PATHS } from "../router/routes.js";
import { getLocalStorage } from "../storage/storage.js";

export const Header = () => `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul id="nav-ul" class="flex justify-around">
        ${renderLoginStatus()}
      </ul>
    </nav>
`;

// 로그인 여부에 따른 렌더링
const renderLoginStatus = () => {
  const user = getLocalStorage("user") || "{}";
  const path = window.location.hash
    ? window.location.hash.slice(1)
    : window.location.pathname;

  if (user.username) {
    return `
      <li><a href="/" class="${path === PATHS.MAIN ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
      <li><a href="/profile" class="${path === PATHS.PROFILE ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
      <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>
    `;
  } else {
    return `
      <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
      <li><a href="/login" id="login-but" class="text-gray-600">로그인</a></li>
    `;
  }
};
