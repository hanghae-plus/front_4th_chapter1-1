import { UserStore } from "@stores";

export const Header = () => {
  const isLogin = UserStore.getValue("isLogin");
  const isHashMode = window.location.pathname.endsWith("hash.html");

  // 현재 경로 가져오기를 해시모드에 맞게 수정
  const currentPath = isHashMode
    ? window.location.hash.slice(1) || "/"
    : window.location.pathname;

  const activeClass = (path) => {
    return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
  };

  // 메뉴의 path를 해시모드에 맞게 수정
  const getPath = (path) => {
    return isHashMode ? `#${path}` : path;
  };

  const menus = [
    {
      path: "/",
      name: "홈",
      id: "home",
      isShow: true,
    },
    {
      path: "/profile",
      name: "프로필",
      id: "profile",
      isShow: true,
    },
    {
      path: "/login",
      name: "로그인",
      id: "login",
      isShow: !isLogin,
    },
    {
      path: "/login",
      name: "로그아웃",
      isShow: isLogin,
      id: "logout",
    },
  ];

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
            id="${menu.id}"
            href="${getPath(menu.path)}" 
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
