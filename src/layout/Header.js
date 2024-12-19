import { clearUser, getUser } from "@/state/handle-state";

export const Header = () => {
  const user = getUser().user;

  const content = `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
        <li><a href="/profile" class="text-gray-600">프로필</a></li>
        <li>
          ${
            user
              ? '<a href="/login" id="logout" class="text-gray-600">로그아웃</a>'
              : '<a href="/login" id="login" class="text-gray-600">로그인</a>'
          }
        </li>
      </ul>
    </nav>
  `;

  return content;
};

document.addEventListener("click", (e) => {
  if (e.target.id === "logout") {
    e.preventDefault();
    clearUser();
    alert("로그아웃 되었습니다.");
  }
});
