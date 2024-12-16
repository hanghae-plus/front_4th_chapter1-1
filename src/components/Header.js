const Header = () => {
  const pathname = window.location.pathname;

  const navList = [
    { text: "홈", href: "/", id: "home" },
    { text: "프로필", href: "/profile", id: "profile" },
    { text: "로그아웃", href: "#", id: "logout" },
  ];

  return `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      ${navList
        .map(({ text, href, id }) => {
          const isSelected = pathname === href;

          return `<li><a id=${id} href=${href} class=${isSelected ? "text-blue-600" : "text-gray-600"}>${text}</a></li>`;
        })
        .join("")}
    </ul>
  </nav>
    `;
};

export default Header;
