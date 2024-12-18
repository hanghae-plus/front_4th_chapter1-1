import UserService from "../service/UserService";
import Router from "../router/Router";
import Controller from "../core/Controller";

class NavbarController extends Controller {
  attachListeners() {
    // 네비게이션 링크 클릭 시 라우팅 처리
    this.addListener("click", ".nav-link", (e) => {
      const target = e.target.closest("a");
      if (!(target instanceof HTMLAnchorElement)) return;

      e.preventDefault();

      // 로그아웃 버튼 처리
      if (target.id === "logout") {
        this.handleLogout();
      }

      // 대상 네비게이션 탭 URL로 이동
      const targetURL = e.target.getAttribute("href");
      Router.instance.navigate(targetURL);
    });
  }

  handleLogout() {
    UserService.logout();
  }

  // 인증 정보 반환
  get auth() {
    return UserService.getAuth();
  }

  // 현재 페이지가 메인 페이지인지 판단
  isMainPage() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    return currentPath === "/" || currentHash === "#/";
  }
}

export default NavbarController;
