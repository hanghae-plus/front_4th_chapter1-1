import userService from "../features/UserService";
import { BASE_URL } from "../shared/const";
import { router } from "../app";

const Header = () => {
  const LOGOUT = "로그아웃";
  const navItemList = [
    { href: "/", title: "홈" },
    { href: "/profile", title: "프로필" },
    userService.isLoggedIn()
      ? { href: "/login", title: LOGOUT }
      : { href: "/login", title: "로그인" },
  ];

  const currentPath = window.location.pathname;
  const isCurrNav = (path) => path === currentPath;
  const navTextColor = (path) => (isCurrNav(path) ? "blue-600" : "gray-600");
  const navFontWeight = (path) => (isCurrNav(path) ? "bold" : "");

  const view = `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
        ${navItemList
          .map(({ href, title }) => {
            return `<li><a href="${href}" id="${title === LOGOUT ? "logout" : ""}" class="text-${navTextColor(href)} font-${navFontWeight(href)}">${title}</a></li>`;
          })
          .join("")}
        </ul>
      </nav>
    `;

  const init = () => {
    const nav = document.querySelector("nav");

    nav.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.innerHTML === LOGOUT) {
        userService.clearUser();
      }

      const { href } = e.target;
      if (!href) return;

      const path = href.replace(BASE_URL, "");

      router(path);
    });
  };

  return { view, init };
};

export default Header;
