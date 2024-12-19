function Nav() {
  const user = localStorage.getItem("user");
  const path = window.location.pathname;

  return `<nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="/" class="${path === "/" ? "text-blue-600 font-bold" : "text-gray-700"}" >
            홈
          </a>
        </li>
        ${
          user
            ? `<li>
          <a href="/profile" class="${path === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}" >
            프로필
          </a>
        </li>`
            : ``
        }
        ${
          user
            ? `<li>
            <a id="logout" name="로그아웃" href="#" class="text-gray-600" >
              로그아웃
            </a>
          </li>`
            : `<li>
              <a href="/login" class="text-gray-600">
                로그인
              </a>
            </li>`
        }
      </ul>
    </nav>`;
}

export default Nav;
