import userService from "../features/userService";
import { BASE_URL } from "../shared/const";
import { router } from "../shared/router";

export const Header = () => {
  const LOGOUT = "로그아웃";
  const navItemList = [
    { href: "/", title: "홈" },
    { href: "/profile", title: "프로필" },
    userService.isLoggedIn()
      ? { href: "#", title: LOGOUT }
      : { href: "/login", title: "로그인" },
  ];

  const currentPath = window.location.pathname;
  const isCurrNav = (path) => path === currentPath;
  const navTextColor = (path) => (isCurrNav(path) ? "blue" : "gray");

  const view = `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
        ${navItemList
          .map(({ href, title }) => {
            return `<li><a href="${href}" id="${title === LOGOUT ? "logout" : ""}" class="text-${navTextColor(href)}-600">${title}</a></li>`;
          })
          .join("")}
        </ul>
      </nav>
    `;

  const init = () => {
    const navList = document.querySelectorAll("li > a");

    navList.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();

        if (e.target.innerHTML === LOGOUT) {
          userService.clearUser();
          router("/login");
        }

        const { href } = e.target;
        if (!href) return;

        const path = href.replace(BASE_URL, "");

        router(path);
      });
    });
  };

  return { view, init };
};
