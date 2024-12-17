import Component from "../core/component";
import { getAuth, logout } from "../auth/auth";
import Router from "../router/router";

class Navbar extends Component {
  constructor($target) {
    super($target);
    this.router = Router.instance;
  }

  setEvent() {
    this.addEvent("click", ".nav-link", (e) => {
      const target = e.target.closest("a");
      if (!(target instanceof HTMLAnchorElement)) return;

      e.preventDefault();

      if (target.id === "logoutBtn") {
        this.handleLogout();
        return; // 로그아웃 후 추가 네비게이션을 막기 위해 return 추가
      }

      const targetURL = target.getAttribute("href");
      this.router.navigate(targetURL);
    });
  }

  handleLogout() {
    logout();
    // 로그아웃 후 홈으로 이동하거나 다른 페이지로 리디렉션할 수 있습니다.
    this.router.navigate("/");
  }

  template() {
    const currentPath = window.location.pathname;
    const auth = getAuth();

    return `
      <nav class="navbar bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="nav-link ${currentPath === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
          ${
            auth
              ? `
                <li><a href="/profile" class="nav-link ${currentPath === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
                <li><a href="/login" id="logoutBtn" class="nav-link text-gray-600">로그아웃</a></li>
              `
              : `<li><a href="/login" class="nav-link text-gray-600">로그인</a></li>`
          }
        </ul>
      </nav>
    `;
  }
}

export default Navbar;
