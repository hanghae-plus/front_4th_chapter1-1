import { useRouter } from "../../main";

const handleLogout = () => {
  const router = useRouter();
  localStorage.removeItem("user");
  router.navigate("/login");
};

const setupHeader = () => {
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      handleLogout();
    });
  }
};

const Header = () => {
  const isLoggedIn = !!localStorage.getItem("user");
  const activeColor = "text-blue-600";
  const deactiveColor = "text-gray-600";
  const getNavColor = (path: string) => {
    return window.location.pathname === path ? activeColor : deactiveColor;
  };

  return /* html */ `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14">
  <ul class="flex justify-around">
     <li><a href="/" class="${getNavColor("/")}" data-link>홈</a></li>
     ${
       isLoggedIn
         ? `
       <li><a href="/profile" class="${getNavColor("/profile")}" data-link>프로필</a></li>
       <li><a id="logout-button" class="${deactiveColor}">로그아웃</a></li>
     `
         : `
       <li><a href="/login" class="${getNavColor("/login")}" data-link>로그인</a></li>
     `
     }
   </ul>
  </nav>
`;
};

export { Header, setupHeader };
