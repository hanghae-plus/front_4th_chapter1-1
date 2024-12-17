import { isAuthenticated } from "../util/login";

/**
 * 컴포넌트의 이벤트를 어떻게 달 수 있을까?
 */

const Header = () => {
  const path = window.location.pathname;

  return `
    <div>
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav id="navigation" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${path === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
        <li><a href="/profile" class="${path === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
        ${
          isAuthenticated()
            ? `<li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>`
            : `<li><a id="login" href="/login" class="text-gray-600">로그인</a></li>`
        }
      </ul>
    </nav>
    </div>
  `;
};

export default Header;
