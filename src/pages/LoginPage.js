import { createAccount } from "../utils/auth";

export const LoginPage = () => {
  const template = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button id="signup-button" class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `;

  // 페이지 초기화 함수
  const loginPageInitialize = () => {
    const loginForm = document.querySelector("#login-form");
    const signupButton = document.querySelector("#signup-button");

    const getUsernameAndPassword = () => {
      const username = document.querySelector("#username").value;
      const password = document.querySelector("#password").value;
      return { username, password };
    };

    const handleCreateAccount = async (createAccountParams) => {
      try {
        const result = await createAccount(createAccountParams);
        console.log(result);
      } catch (error) {
        alert(error.message);
      }
    };

    if (signupButton) {
      signupButton.addEventListener("click", (event) => {
        event.preventDefault();
        const { username, password } = getUsernameAndPassword();
        handleCreateAccount({ id: username, password });
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const { username, password } = getUsernameAndPassword();
        // 계정 생성 로직 호출

        console.log(username, password);
      });
    }
  };

  return { template, init: loginPageInitialize };
};
