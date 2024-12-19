export const GnbMenu = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentPath = window.location.hash.replace("#", "") || "/";
  return `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${currentPath === "/" ? "text-blue-600 font-bold" : ""}">홈</a></li>
      ${
        user
          ? `
            <li>
              <a href="/profile" class="${currentPath === "/profile" ? "text-blue-600 font-bold" : ""}">
                프로필
              </a>
            </li>
          `
          : ""
      }
      ${
        user
          ? `
            <li>
              <a href="/login" id="logout" class="text-gray-600">로그아웃</a>
            </li>
          `
          : `
            <li>
              <a href="/login" class="text-gray-600 ${currentPath === "/login" ? "text-blue-600 font-bold" : ""}">
                로그인
              </a>
            </li>
          `
      }
    </ul>
  </nav>
  `;
};
