import {
  LOGIN_FORM_ID,
  usernameInputName,
  passwordInputName,
} from "../constants/html";
import { USER_INFO_LOCALSTORAGE_KEY } from "../constants/user";
import router from "../router/router";

const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id=${LOGIN_FORM_ID}>
        <div class="mb-4">
          <input type="text" id=${usernameInputName} name=${usernameInputName} placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" id=${passwordInputName} name=${passwordInputName} placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
    </div>
  </main>
`;

export default function renderLogin() {
  const userInfo = localStorage.getItem(USER_INFO_LOCALSTORAGE_KEY);

  if (userInfo) {
    router("/");
    return;
  }

  const root = document.querySelector("#root");
  const targetElement = root ? root : document.body;

  targetElement.innerHTML = `
    ${LoginPage()}`;

  document.body
    .querySelector(`#${LOGIN_FORM_ID}`)
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const username = e.target.elements[usernameInputName].value;
      localStorage.setItem(
        USER_INFO_LOCALSTORAGE_KEY,
        JSON.stringify({
          username,
          email: "",
          bio: "",
        }),
      );

      router("/");
    });
}
