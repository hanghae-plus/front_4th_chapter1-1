const GlobalNavigation = () => {
  const userInfo = localStorage.getItem("user");
  const pathname = location.pathname;

  const toggleLogin = userInfo
    ? `<a id="logout" href="#" class="text-gray-600">로그아웃</a>`
    : `<a id="login" href="/login" class="text-gray-600">로그인</a>`;

  const toggleProfile = userInfo
    ? ` <li><a href="/profile" class=${pathname === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}>프로필</a></li>`
    : "";

  return `<nav id="gnb" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${pathname === "/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
        ${toggleProfile}
        <li>${toggleLogin}</li>
      </ul>
      </nav>`;
};

export default GlobalNavigation;
