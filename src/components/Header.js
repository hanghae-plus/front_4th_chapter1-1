import userStore from "../store/UserStore.js";
import router from "../router/Router.js";

const Header = () => {
  const navItemList = [
    { href: "/", title: "홈" },
    { href: "/profile", title: "프로필" },
    userStore.LoginState()
      ? { href: "/", title: "로그아웃" }
      : { href: "/login", title: "로그인" },
  ];

  const currentPath = window.location.pathname;
  const isCurrNav = (path) => path === currentPath;
  const navTextColor = (path) => (isCurrNav(path) ? "blue-600" : "gray-600");
  const navFontWeight = (path) => (isCurrNav(path) ? "bold" : "");

  const html = `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
        ${navItemList
          .map(({ href, title }) => {
            return `<li><a href="${href}" id="${title === "로그아웃" ? "logout" : ""}" class="text-${navTextColor(href)} font-${navFontWeight(href)}">${title}</a></li>`;
          })
          .join("")}
        </ul>
      </nav>
    `;

  const init = () => {
    const nav = document.querySelector("nav");

    nav.addEventListener("click", (e) => {
      e.preventDefault();

      const clickedLink = e.target.closest("a");
      if (!clickedLink) return;

      if (clickedLink.innerHTML === "로그아웃") {
        userStore.deleteUser();
      }

      const path = clickedLink.href.replace(window.location.origin, "");

      router(path);
    });
  };

  return { html, init };
};

export default Header;
