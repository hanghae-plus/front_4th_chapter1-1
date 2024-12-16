// src/features/auth/logout/ui/logout-button.js
import { handleLogout } from "../model/logout";

const LogoutButton = () => {
  // 이벤트 위임을 사용하여 document 레벨에서 처리
  document.addEventListener(
    "click",
    (e) => {
      if (e.target.id === "logout") {
        e.preventDefault();
        handleLogout();
      }
    },
    { once: true },
  ); // 이벤트 리스너가 한 번만 실행되도록 설정

  return `
    <li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>
  `;
};

export { LogoutButton };
