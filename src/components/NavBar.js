import { getLocalStorage } from "../utils/storage";
const NavBar = () => {
  const user = JSON.parse(getLocalStorage("user"));
  const profileNavItem =
    location.pathname === "/profile"
      ? `<li><a href="/profile" data-link class="text-blue-600 font-bold">프로필</a></li>`
      : `<li><a href="/profile" data-link class="text-gray-600">프로필</a></li>`;
  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" data-link class='${location.pathname === "/" ? "text-blue-600 font-bold" : "text-gray-600"}'>홈</a></li>
          ${user ? profileNavItem : ""}
          <li><a id="${user ? "logout" : "login"}" href="/login" data-link class=${location.pathname === "/login" ? "text-blue-600 font-bold" : "text-gray-600"}>${user ? "로그아웃" : "로그인"}</a></li>
        </ul>
      </nav>    
    `;
};

export default NavBar;
