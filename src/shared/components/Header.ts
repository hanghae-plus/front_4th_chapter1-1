import { getCurrentPath } from "./utils/getCurrentPath";

const Header = () => {
  const isLoggedIn = !!localStorage.getItem("user");
  const activeColor = "text-blue-600 font-bold";
  const deactiveColor = "text-gray-600";

  const getNavColor = (path: string) => {
    return getCurrentPath() === path ? activeColor : deactiveColor;
  };

  return /* html */ `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14" role="navigation">
  <ul class="flex justify-around">
     <li><a href="${window.ROUTE_MODE === "hash" ? "#/" : "/"}" class="${getNavColor("/")}" data-link>홈</a></li>
     ${
       isLoggedIn
         ? `
       <li><a href="${window.ROUTE_MODE === "hash" ? "#/profile" : "/profile"}" class="${getNavColor("/profile")}" data-link>프로필</a></li>
       <li><a id="logout" href="#" class="${deactiveColor}" data-action="logout">로그아웃</a></li>
     `
         : `
       <li><a href="${window.ROUTE_MODE === "hash" ? "#/login" : "/login"}" class="${getNavColor("/login")}" data-link>로그인</a></li>
     `
     }
   </ul>
  </nav>
`;
};

export default Header;
