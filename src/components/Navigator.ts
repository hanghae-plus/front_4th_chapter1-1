import { User } from "@/store/userStore";

export const LOGIN_ID = "login";
export const LOGOUT_ID = "logout";

export const Navigator = (user: User) => {
  document.querySelector("#root")?.addEventListener("click", (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      if (e.target.id === LOGOUT_ID) {
        localStorage.removeItem("user");
      }
    }
  });

  return `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
      <li><a href="/profile" class="text-gray-600">프로필</a></li>
      <li><a id=${user?.username ? LOGOUT_ID : LOGIN_ID} href="/login" class="text-gray-600">${user?.username ? "로그아웃" : "로그인"}</a></li>
    </ul>
  </nav>
`;
};
