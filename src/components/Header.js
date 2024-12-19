import userStore from "../core/userStore";

const Header = () => {
  const currentPath = window.location.pathname;

  const textColor = (path) => {
    return path === currentPath ? "text-blue-600 font-bold" : "text-gray-600";
  };

  const isLogin = () => {
    return userStore.checkLoginState();
  };

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${textColor("/")}">홈</a></li>
          ${isLogin() ? `<li><a href="/profile" class="${textColor("/profile")}">프로필</a></li>` : `<li><a href="/login" class="text-gray-600">로그인</a></li>`}
          ${isLogin() ? `<li><a href = "/#" id = "logout" class="text-gray-600">로그아웃</a></li>` : ""}
        </ul>
      </nav>
    `;
};
export default Header;
