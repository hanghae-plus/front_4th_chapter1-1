import { UserStore } from "../store";

const getSelectedClass = (path) => {
  const location = window.location.hash
    ? window.location.hash.slice(1)
    : window.location.pathname;
  return location === path ? "text-blue-600 font-bold" : "text-gray-600";
};

const Header = () => {
  const user = new UserStore().get();

  let li = `<li><a href="/" class="${getSelectedClass("/")}">홈</a></li>`;
  if (user) {
    li += `
      <li><a href="/profile" class="${getSelectedClass("/profile")}">프로필</a></li>
      <li><a id="logout" href="/login" class="text-gray-600">로그아웃</a></li>
    `;
  } else {
    li += `<li><a id="login-link" href="/login" class="text-gray-600">로그인</a></li>`;
  }

  return `<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${li}
        </ul>
      </nav>`;
};

export default Header;
