import { useRouter } from "../../main";

const handleLogout = () => {
  const router = useRouter();
  localStorage.removeItem("user");
  router.navigate("/login");
};

const setupHeader = () => {
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      handleLogout();
    });
  }
};

const Header = () => {
  const isLoggedIn = !!localStorage.getItem("user");

  return /* html */ `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="text-blue-600" data-link>홈</a></li>
      ${
        isLoggedIn
          ? `
        <li><a href="/profile" class="text-gray-600" data-link>프로필</a></li>
        <li><a id="logout-button" class="text-gray-600">로그아웃</a></li>
      `
          : `
        <li><a href="/login" class="text-gray-600" data-link>로그인</a></li>
      `
      }
    </ul>
  </nav>
`;
};

export { Header, setupHeader };
