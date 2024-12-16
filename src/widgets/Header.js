const navItemList = [
  { href: "/", title: "홈" },
  { href: "/profile", title: "프로필" },
  { href: "/login", title: "로그아웃" },
];

export const Header = () => {
  const currentPath = window.location.pathname;
  const isCurrNav = (path) => path === currentPath;
  const navTextColor = (path) => (isCurrNav(path) ? "blue" : "gray");

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
        ${navItemList
          .map(({ href, title }) => {
            return `<li><a href="${href}" class="text-${navTextColor(href)}-600">${title}</a></li>`;
          })
          .join("")}
        </ul>
      </nav>
    `;
};
