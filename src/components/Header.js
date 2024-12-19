const navigationData = [
  {
    linkUrl: "/",
    text: "홈",
  },
  {
    linkUrl: "/profile",
    text: "프로필",
  },
];

export const Header = (isLoggedIn) => {
  const path = window.location.pathname;
  return /*html*/ `  
    <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
            ${navigationData?.map((e) => {
              return `<li><a href="${e.linkUrl}" class="text-blue-600 ${path === e.linkUrl ? "font-bold" : ""}">${e.text}</a></li>`;
            })}
            ${
              isLoggedIn
                ? `<li>
                  <a href="#" id="logout" class="text-gray-600">
                    로그아웃
                  </a>
                </li>`
                : `<li>
                  <a href="/login" class="text-gray-600">
                    로그인
                  </a>
                </li>`
            }
        </ul>
    </nav>
`;
};
