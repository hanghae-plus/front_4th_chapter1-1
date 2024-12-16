import { clear, isLoggedIn } from "./local-storage";
import { navigate } from "./main";
export const Header = () => {
  const loggedIn = isLoggedIn();

  // Conditionally render the navigation links based on loggedIn status

  const html = `
        <div>
            <header class="bg-blue-600 text-white p-4 sticky top-0">
                <h1 class="text-2xl font-bold">항해플러스</h1>
            </header>
            <nav class="bg-white shadow-md p-2 sticky top-14">
                <ul class="flex justify-around">
                    <li><a href="/" class="text-blue-600">홈</a></li>
                    ${
                      loggedIn
                        ? `
                        <li><a href="/profile" class="text-gray-600">프로필</a></li>
                        <li><button id="logout" class="text-gray-600">로그아웃</button></li>
                    `
                        : `
                        <li><a href="/login" class="text-gray-600">로그인</a></li>
                    `
                    }
                </ul>
            </nav>
        </div>
    `;

  // Attach event listener for logout button
  setTimeout(() => {
    const logoutButton = document.querySelector("#logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        clear();
        navigate("/");
      });
    }
  }, 0);

  return html;
};
