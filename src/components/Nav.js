function Nav() {
  const id = localStorage.getItem("id");
  const path = window.location.pathname;
  return `<nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="/" class=${path === "/" ? "text-blue-600" : "text-gray-600"}>
            홈
          </a>
        </li>
        <li>
          <a href="/profile" class=${path === "/profile" ? "text-blue-600" : "text-gray-600"}>
            프로필
          </a>
        </li>
        ${
          id
            ? `<li>
            <a id="logout" href="#" class="text-gray-600" >
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
