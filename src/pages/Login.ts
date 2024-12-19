import { router } from "@/core/router";
import { userStore } from "@/store/userStore";

const LOGIN_FORM_ID = "login-form";

export const LoginPage = () => {
  document.getElementById("root")?.addEventListener("submit", (e) => {
    if (!(e.target instanceof HTMLFormElement)) return;

    if (e.target.id === LOGIN_FORM_ID) {
      const $form = e.target;
      const formData = new FormData($form);
      const username = formData.get("username")?.toString();

      if (!username) {
        alert("유저이름을 입력해주세요");
        return;
      }

      userStore.setUser({
        username,
        email: "",
        bio: "",
      });

      router.navigateTo("/");
    }
  });

  return `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id=${LOGIN_FORM_ID}>
        <div class="mb-4">
          <input id="username" name="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" name="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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
};
