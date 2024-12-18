import { Auth } from "../auth/auth";
import { PAGES, ID } from "../common/const";

export const NavBar = () => {
  const isLoggedIn = Auth.isLoggedIn;

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href=${PAGES.MAIN_PAGE} class="text-blue-600">홈</a></li>
        ${
          isLoggedIn
            ? `
          <li><a href=${PAGES.PROFILE_PAGE} class="text-gray-600">프로필</a></li>
          <li><a href=${PAGES.LOGIN_PAGE} id=${ID.LOGOUT} class="text-gray-600">로그아웃</a></li>
          `
            : `
          <li><a href=${PAGES.LOGIN_PAGE} class="text-gray-600">로그인</a></li>
          `
        }
      </ul>
    </nav>
  `;
};
