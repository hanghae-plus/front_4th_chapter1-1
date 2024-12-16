import isLogin from "../utils/isLogin";
const Nav = () => `
    <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
            <li><a href="/" class="text-blue-600">홈</a></li>
            <li><a href="/profile" class="text-gray-600">프로필</a></li>
            <li>${
              isLogin()
                ? '<a id="logout" href="#" class="text-gray-600">로그아웃</a>'
                : '<a href="/login" class="text-gray-600">로그인</a>'
            }</li>
        </ul>
    </nav>
`;

export default Nav;
