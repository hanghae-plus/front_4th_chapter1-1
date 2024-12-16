import { useRouter } from "../../../app/router/lib/hooks";
import { LogoutButton } from "../../../features/auth/logout";

const Navigation = () => {
  const router = useRouter();
  const pathName = router.getCurrentPath();
  const isAuthenticated = localStorage.getItem("user") !== "null";

  const render = () => `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class=${pathName === "/" ? "text-blue-600" : "text-gray-600"}>홈</a></li>
        ${
          isAuthenticated
            ? `
                <li><a href="/profile" class=${pathName === "/profile" ? "text-blue-600" : "text-gray-600"}>프로필</a></li>
                ${LogoutButton()}
              `
            : `<li><a href="/login" class=${pathName === "/login" ? "text-blue-600" : "text-gray-600"}>로그인</a></li>`
        }
        
      </ul>
    </nav>
  `;

  return render();
};

export { Navigation };
