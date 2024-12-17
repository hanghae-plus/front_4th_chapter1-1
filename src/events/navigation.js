import { router } from "../router/router.js";
import { setState } from "./../store/store";

export const handleNavigation = (e) => {
  const selected = e.target.closest("a");
  if (selected && selected.getAttribute("href")) {
    e.preventDefault();
    const path = selected.getAttribute("href");
    history.pushState({}, "", path);
    router();
  }
};

export const handleLogout = (e) => {
  const logoutBtn = e.target.closest("#logout");

  if (logoutBtn) {
    localStorage.removeItem("user");
    setState({ user: null }); // 상태 초기화

    history.pushState({}, "", "/login");
    router();
  }
};

export const initNavigation = () => {
  document.body.addEventListener("click", handleNavigation);
};

export const initLogOut = () => {
  document.body.addEventListener("click", handleLogout);
};
