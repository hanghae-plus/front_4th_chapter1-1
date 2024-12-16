const user = localStorage.getItem("user");

export const GnbMenu = () => `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="text-gray-600">홈</a></li>
      ${
        user
          ? '<li><a href="/profile" class="text-blue-600">프로필</a></li>'
          : ""
      }
      ${
        user
          ? '<li><a href="/" class="text-gray-600">로그아웃</a></li>'
          : '<li><a href="/login" class="text-gray-600">로그인</a></li>'
      }
    </ul>
  </nav>
`;
