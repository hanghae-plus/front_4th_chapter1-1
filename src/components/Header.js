import { authStore } from "../store/AuthStore";

export const Header = () => {
  const currentPath = location.hash
    ? location.hash.slice(1)
    : location.pathname;
  const activeMenu = "text-blue-600 font-bold";
  const inActiveMenu = "text-gray-600";

  const isActive = (path) => {
    return currentPath === path ? activeMenu : inActiveMenu;
  };

  const container = document.createElement("div");

  const render = () => {
    container.innerHTML = `<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${isActive("/")}">홈</a></li>
          <li><a href="/profile" class="${isActive("/profile")}">프로필</a></li>
          ${
            authStore.isLogin()
              ? `<li>
                <a href="#" id="logout" class="text-gray-600">
                  로그아웃
                </a>
              </li>`
              : `<li>
                <a href="/login" class="text-gray-600">
                  로그인
                </a>
              </li>`
          }
          
        </ul>
      </nav>`;
  };

  render();

  return container;
};
