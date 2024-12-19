export const Header = () => {
  const user = localStorage.getItem("user");
  const isHashRouter = window.location.pathname.includes("hash.html");
  const getHref = (path) => (isHashRouter ? `#${path}` : path);

  return `<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav role="navigation" class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="${getHref("/")}" class="text-blue-600 ${window.location.pathname === "/" || window.location.hash === "#/" ? "font-bold" : ""}">홈</a></li>
          ${
            user
              ? `<li><a href="${getHref("/profile")}" class="text-gray-600">프로필</a></li>`
              : `<li><a href="${getHref("/login")}" class="text-gray-600">로그인</a></li>`
          }
          ${
            user
              ? `<li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>`
              : ""
          }
        </ul>
      </nav>
`;
};
