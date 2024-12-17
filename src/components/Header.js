const Header = () => {
  const currentPath = window.location.pathname;

  const textColor = (path) => {
    return path === currentPath ? "text-blue-600" : "text-gray-600";
  };

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class=${textColor("/")}>홈</a></li>
          <li><a href="/profile" class=${textColor("/profile")}>프로필</a></li>
          <li><a href="#" class=${textColor("/#")}>로그아웃</a></li>
        </ul>
      </nav>
    `;
};
export default Header;
