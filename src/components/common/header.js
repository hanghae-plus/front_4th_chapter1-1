import { UserStore } from "@stores";

export const Header = () => {
  const isLogin = UserStore.getValue("isLogin");
  const currentPath = window.location.pathname;

  const activeClass = (path) => {
    return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
  };

  const menus = [
    {
      path: "/",
      name: "홈",
      isShow: true,
    },
    {
      path: "/profile",
      name: "프로필",
      isShow: true,
    },
    {
      path: "/login",
      name: "로그인",
      isShow: !isLogin,
    },
    {
      path: "/login",
      name: "로그아웃",
      isShow: isLogin,
    },
  ];

  // 로그아웃 핸들러
  const setupLogoutHandler = () => {
    const loginLink = document.querySelector('nav a[href="/login"]');
    if (loginLink && isLogin) {
      loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        UserStore.clearState();
        window.location.href = "/login";
      });
    }
  };

  setTimeout(setupLogoutHandler, 0);

  return `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
    ${menus
      .filter((menu) => menu.isShow)
      .map(
        (menu) => `
        <li>
          <a 
            href="${menu.path}" 
            class="${activeClass(menu.path)}"
          >
            ${menu.name}
          </a>
        </li>
      `,
      )
      .join("")}
    </ul>
  </nav>
  `;
};
