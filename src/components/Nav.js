import isLogin from "../utils/isLogin";

const Nav = () => {
  const activateStyle = "text-blue-600 font-bold";
  const deactivateStyle = "text-gray-600";
  const handleActivate = (x) => (x === path ? activateStyle : deactivateStyle);
  const path = window.location.pathname;

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
            <li><a href="/"  class="${handleActivate("/")}">홈</a></li>
            <li><a href="/profile" class="${handleActivate("/profile")}">프로필</a></li>
            <li>${
              isLogin()
                ? '<a id="logout" href="#" class="text-gray-600">로그아웃</a>'
                : '<a href="/login" class="text-gray-600">로그인</a>'
            }</li>
        </ul>
    </nav>
`;
};

export default Nav;
