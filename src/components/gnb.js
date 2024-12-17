import {
  GLOBAL_NAVIGATION_ID,
  LOGIN_BTN_ID,
  LOGOUT_BTN_ID,
} from "../constants/html";
import { USER_INFO_LOCALSTORAGE_KEY } from "../constants/user";

const GlobalNavigation = () => {
  const userInfo = localStorage.getItem(USER_INFO_LOCALSTORAGE_KEY);
  const pathname = location.pathname;

  const toggleLogin = userInfo
    ? `<a id=${LOGOUT_BTN_ID} href="#" class="text-gray-600">로그아웃</a>`
    : `<a id=${LOGIN_BTN_ID} href="/login" class="text-gray-600">로그인</a>`;

  const togglePfile = userInfo
    ? ` <li><a href="/profile" class=${pathname === "/profile" ? "text-blue-600" : "text-gray-600"}>프로필</a></li>`
    : "";

  return `<nav id=${GLOBAL_NAVIGATION_ID} class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class=${pathname === "/" ? "text-blue-600" : "text-gray-600"} >홈</a></li>
      ${togglePfile}
      <li>${toggleLogin}</li>
    </ul>
    </nav>`;
};

export default GlobalNavigation;
