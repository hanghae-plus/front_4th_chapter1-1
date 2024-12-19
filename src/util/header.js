import { Store } from "../store/store";

export const Header = () => {
  const currentPath = window.location.pathname;
  const hashPath = window.location.hash;
  const store = new Store();
  let isLogin = !!store.getState();
  return `
		<header class="bg-blue-600 text-white p-4 sticky top-0">
			<h1 class="text-2xl font-bold">항해플러스</h1>
		</header>

		<nav class="bg-white shadow-md p-2 sticky top-14">
			<ul class="flex justify-around">
				<li><a href="/" class="${currentPath === "/" || hashPath === "#/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
				${
          isLogin
            ? `<li><a href="/profile" class="${currentPath === "/profile" || hashPath === "#/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
							<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
            : `<li><a href="/login" id="login" class="text-gray-600">로그인</a></li>`
        }
			</ul>
		</nav>
	`;
};
