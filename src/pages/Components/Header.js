// NavItem 데이터
const NavItems = {
  true: [
    { url: "/", str: "홈" },
    { url: "/profile", str: "프로필" },
    { url: "/logout", str: "로그아웃" },
  ],
  false: [
    { url: "/", str: "홈" },
    { url: "/login", str: "로그인" },
  ],
};

// 네비게이션 리스트 생성 함수
const createNavList = (isLogin) => {
  const items = NavItems[isLogin]; // true 또는 false 키에 해당하는 배열
  return items
    .map(
      ({ url, str }) =>
        `<li>
          <a 
            href="${url}" 
            class="${window.location.pathname === url ? "text-blue-600" : "text-gray-600"}"
            ${url === "/logout" ? 'id="logout"' : ""}>
            ${str}
          </a>
        </li>`,
    )
    .join("");
};

// Header 컴포넌트
const Header = () => {
  const isLogin = localStorage.getItem("isLogin") === "true"; // Boolean 변환
  const navList = createNavList(isLogin); // 네비게이션 리스트 생성

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${navList}
      </ul>
    </nav>`;
};

export default Header;
