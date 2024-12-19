import { getLocalStorage } from "../utils/storage";
const NavBar = () => {
  const user = JSON.parse(getLocalStorage("user"));
  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" data-link class="text-blue-600">홈</a></li>
          ${user ? '<li><a href="/profile" data-link class="text-gray-600">프로필</a></li>' : ""}
          <li><a id="${user ? "logout" : "login"}" href="/login" data-link class="text-gray-600">${user ? "로그아웃" : "로그인"}</a></li>
        </ul>
      </nav>    
    `;
};

export default NavBar;
