export const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentPath = window.location.pathname;

  const isHomeActive = currentPath === "/";
  const isProfileActive = currentPath === "/profile";
  const homeLinkClass = isHomeActive ? "text-blue-600" : "text-gray-600";
  const profileLinkClass = isProfileActive ? "text-blue-600" : "text-gray-600";

  return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" data-link class="${homeLinkClass}">홈</a></li>
          <li><a href="/profile" data-link class="${profileLinkClass}">프로필</a></li>
          ${
            user
              ? `<li><button id="logout" class="text-gray-600">로그아웃</button></li>`
              : `<li><a href="/login" data-link class="text-gray-600">로그인</a></li>`
          }
        </ul>
      </nav>
    `;
};
