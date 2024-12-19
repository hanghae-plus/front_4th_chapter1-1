import { clearUser } from "@/state/handle-state";

const handleLogout = () => {
  clearUser();
  alert("로그아웃되었습니다.");
};

const addEventListeners = () => {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogout();
    });
  }
};

export const Header = (isLoggedIn = false) => {
  const content = `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="text-blue-600">홈</a></li>
      <li><a href="/profile" class="text-gray-600">프로필</a></li>
      <li>
        ${
          isLoggedIn
            ? '<a href="/login" id="logoutButton" type="button" class="text-gray-600">로그아웃</a>'
            : '<a href="/login" class="text-gray-600">로그인</a>'
        }
      </li>
    </ul>
  </nav>
`;

  setTimeout(addEventListeners, 0);

  return content;
};
