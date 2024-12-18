import Component from "../core/component";

class Navbar extends Component {
  template() {
    return `
      <nav class="navbar bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="nav-link ${this.controller.isMainPage() ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
          ${
            this.controller.auth
              ? `<li><a href="/profile" class="nav-link ${!this.controller.isMainPage() ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
              <li><a href="/login" id="logout" class="nav-link text-gray-600">로그아웃</a></li>`
              : `<li><a href="/login" id="login" class="nav-link text-gray-600">로그인</a></li>`
          }
        </ul>
      </nav>
    `;
  }
}

export default Navbar;
