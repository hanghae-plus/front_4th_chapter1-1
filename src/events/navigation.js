import { navigateTo } from "../router/router.js";
import { clearStorage } from "../utils/storageHandler.js";
import { setState } from "./../store/store";

export const handleNavigation = (e) => {
  const selected = e.target.closest("a");
  if (!selected) return;

  const isLogoutBtn = selected.hasAttribute("id") && selected.id === "logout";

  if (isLogoutBtn) {
    clearStorage();
    setState({ user: null }); // 상태 초기화
    navigateTo("/login");
  } else {
    const path = selected.getAttribute("href");
    navigateTo(path);
  }
};

export const initNavigation = () => {
  document.body.addEventListener("click", handleNavigation);
};
