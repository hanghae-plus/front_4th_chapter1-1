import { navigateTo } from "../router/router.js";
import { clearLocalStorage, saveLocalStorage } from "../storage/storage.js";

export const mainEvents = () => {
  // 헤더 이동
  document.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (target) {
      e.preventDefault();
      e.stopPropagation();
      const href = target.getAttribute("href");
      if (href) {
        navigateTo(href);
      }
    }
  });

  // 프로필 수정
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target && e.target.id === "profile-form") {
      const updatedUser = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        bio: document.getElementById("bio").value,
      };

      saveLocalStorage("user", updatedUser);
      alert("프로필이 업데이트 되었습니다.");
    }
  });

  // 로그아웃
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "logout") {
      e.preventDefault();
      clearLocalStorage();
      navigateTo("/login");
    }
  });
};
