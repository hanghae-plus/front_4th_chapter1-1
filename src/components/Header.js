import UserStore from "../store/userStore";

const Header = () => {
  const isLogin = !!new UserStore().getUser();
  const path = window.location.pathname;
  // 석호님 코드 따라하기
  const activeStyle = "text-blue-600 font-bold";
  const deavtiveStyle = "text-gray-600";
  const activeWhen = (x) => (x === path ? activeStyle : deavtiveStyle);

  return `
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>
        <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
                <li><a href="/" class="${activeWhen("/")}"}>홈</a></li>
                <li><a href="/profile" class="${activeWhen("/profile")}">프로필</a></li>
                <li>
                ${
                  isLogin
                    ? '<a id="logout" href="#" class="text-gray-600">로그아웃</a>'
                    : '<a href="/login" class="text-gray-600">로그인</a>'
                }
                </li>
            </ul>
        </nav>
    `;
};

export default Header;
