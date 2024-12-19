import { isLoggedIn } from "../utils/local-storage";

export const Header = () => {
  const loggedIn = isLoggedIn();

  const path = window.location.pathname;

  const activatedStyle = "text-blue-600";
  const deactivatedStyle = "text-gray-600";

  const html = `
        <div>
            <header class="bg-blue-600 text-white p-4 sticky top-0">
                <h1 class="text-2xl font-bold">항해플러스</h1>
            </header>
            <nav class="bg-white shadow-md p-2 sticky top-14">
                <ul class="flex justify-around">
                    <li><a href="/" class="${path === "/" ? activatedStyle : deactivatedStyle}">홈</a></li>
                    ${
                      loggedIn
                        ? `
                        <li><a href="/profile" class="${path === "/profile" ? activatedStyle : deactivatedStyle}">프로필</a></li>
                        <li><a id="logout" href="#" class="${deactivatedStyle}">로그아웃</a></li>
                    `
                        : `
                        <li><a href="/login" class="${deactivatedStyle}">로그인</a></li>
                    `
                    }
                </ul>
            </nav>
        </div>
    `;

  return html;
};
