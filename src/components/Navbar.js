export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const currentPath = window.location.hash
    ? window.location.hash.replace(/^#/, "") || "/"
    : window.location.pathname;

  const isHomeActive = currentPath === "/";
  const isProfileActive = currentPath === "/profile";

  const homeLinkClass = isHomeActive
    ? "text-blue-600 font-bold"
    : "text-gray-600";
  const profileLinkClass = isProfileActive
    ? "text-blue-600 font-bold"
    : "text-gray-600";

  return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" data-link class="${homeLinkClass}">홈</a></li>
          <li><a href="/profile" data-link class="${profileLinkClass}">프로필</a></li>
          ${
            user
              ? `<li><a href="/login" id="logout" class="text-gray-600 cursor-pointer">로그아웃</a></li>`
              : `<li><a href="/login" data-link class="text-gray-600">로그인</a></li>`
          }
        </ul>
      </nav>`;
};
