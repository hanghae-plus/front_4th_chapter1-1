export const Header = () => `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul id="nav-ul" class="flex justify-around">
        ${renderLoginStatus()}
      </ul>
    </nav>
`;

function renderLoginStatus() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const path = window.location.pathname;
  console.log("user", user);

  if (user.email) {
    return `
      <li><a href="/" class="${path === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
      <li><a href="/profile" class="${path === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
      <li><a href="/login" id="logout-but" class="text-gray-600">로그아웃</a></li>
    `;
  } else {
    return `
      <li><a href="/" class="text-blue-600">홈</a></li>
      <li><a href="/login" id="login-but" class="text-gray-600">로그인</a></li>
    `;
  }
}
