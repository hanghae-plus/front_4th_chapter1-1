import userService from "../features/userService";
import { InputName } from "../shared/const";
import { router } from "../shared/router";

export const LoginPage = () => {
  const view = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" name=${InputName.ID} placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" name=${InputName.PASSWORD} placeholder="비밀번호" class="w-full p-2 border rounded">
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

  const init = () => {
    const form = document.querySelector("#login-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = form.querySelector(`input[name = ${InputName.ID}]`)?.value;
      // const pw = form.querySelector(
      //   `input[name = ${InputName.PASSWORD}]`,
      // )?.value;

      if (!(userService.isValidName(id) || userService.isValidEmail(id))) {
        return alert("이메일 또는 전화번호를 확인해주세요.");
      }

      if (userService.isValidName(id)) {
        userService.setUser({ username: id, email: "", bio: "" });
      } else if (userService.isValidEmail(id)) {
        userService.setUser({ email: id, username: "", bio: "" });
      }
      router("/");
    });
  };

  return { view, init };
};
