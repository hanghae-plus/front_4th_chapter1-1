import UserStore from "@/lib/user";

const navList = {
  private: [
    {
      path: "/profile",
      title: "프로필",
      id: "profile",
    },
    {
      path: "/login",
      title: "로그아웃",
      id: "logout",
    },
  ],
  public: [
    {
      path: "/login",
      title: "로그인",
      id: "login",
    },
  ],
};
const getClassName = (path) => {
  const currentPath = window.location.hash
    ? window.location.hash.slice(1)
    : window.location.pathname;
  return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
};
export function Header() {
  const renderedNavs = UserStore.checkLogin()
    ? navList.private
    : navList.public;

  return `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
  <div id="nav">
  <nav id="navigation" class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${getClassName("/")}">홈</a></li>
      ${renderedNavs
        .map(
          ({ id, path, title }) =>
            `<li key=${id}><a id=${id} href="${path}" class="${getClassName(path)}">${title}</a></li>`,
        )
        .join("")}
    </ul>
  </nav>
  </div>
  `;
}
