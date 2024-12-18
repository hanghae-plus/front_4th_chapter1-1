import { ROUTES } from "../../constants/routes";
import { state } from "../../store/store";

const Header = () => {
  const LoginMenu = (isLoggedIn) => {
    return isLoggedIn
      ? `
          <li><a href=${ROUTES.PROFILE} class="text-gray-600">프로필</a></li>
          <li><a href=${ROUTES.LOGIN} id="logout" class="text-gray-600">로그아웃</a></li>
        `
      : `
          <li><a href=${ROUTES.LOGIN} class="text-gray-600">로그인</a></li>
        `;
  };

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href=${ROUTES.HOME} class="text-blue-600 font-bold">홈</a></li>
        ${LoginMenu(state.user)}
      </ul>
    </nav>
  `;
};

export default Header;
