import { router } from "../router/router.js";
import { setState } from "./../store/store";

const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const handleNavigation = (e) => {
  e.preventDefault();

  const selected = e.target.closest("a");

  if (selected) {
    const isLogoutBtn = selected.hasAttribute("id") && selected.id === "logout";

    if (isLogoutBtn) {
      localStorage.removeItem("user");
      setState({ user: null }); // 상태 초기화
      navigateTo("/login");
    } else {
      // 로그아웃 외 네비게이션 메뉴들
      const path = selected.getAttribute("href");
      navigateTo(path);
    }
  }
};

export const initNavigation = () => {
  document.body.addEventListener("click", handleNavigation);
};
