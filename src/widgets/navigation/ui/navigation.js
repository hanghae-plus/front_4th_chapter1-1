// src/widgets/navigation/ui/navigation.js
import { useRouter } from "../../../app/router/lib/hooks";
import { LogoutButton } from "../../../features/auth/logout";

const Navigation = () => {
  const router = useRouter();
  const pathName = router.getCurrentPath();
  const isAuthenticated = localStorage.getItem("user") !== null;

  const getActiveClass = (path) =>
    path === pathName ? '"text-blue-600 font-bold"' : '"text-gray-600"';

  const render = () => `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class=${getActiveClass("/")}>홈</a></li>
        ${
          isAuthenticated
            ? `
                <li><a href="/profile" class=${getActiveClass("/profile")}>프로필</a></li>
                ${LogoutButton()}
              `
            : `<li><a href="/login" class=${getActiveClass("/login")}>로그인</a></li>`
        }
      </ul>
    </nav>
  `;

  return render();
};

export { Navigation };
