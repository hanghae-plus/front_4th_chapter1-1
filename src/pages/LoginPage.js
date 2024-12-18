import { signIn, signUp } from "../store";
import { navigate } from "../router";

export const LoginPage = () => {
  const template = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
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

    const handleCreateAccount = (username) => {
      // const { , password } = createAccountParams;
      // if (!id || !password) {
      //   alert("아이디와 비밀번호를 입력하세요.");
      //   return;
      // }
      try {
        const result = signUp(username);
        if (result.success) {
          // alert(result.message);
          // navigate("/");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    const handleLogin = (loginParams) => {
      const { username } = loginParams;
      if (!username) {
        alert("아이디와 비밀번호를 입력하세요.");
        return;
      }
      try {
        const result = signIn(username);
        if (result.success) {
          // alert(result.message);
          navigate("/profile");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    if (signupButton) {
      signupButton.addEventListener("click", (event) => {
        event.preventDefault();
        const { username } = getUsernameAndPassword();

        handleCreateAccount({ id: username });
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const { username, password } = getUsernameAndPassword();

        handleLogin({ username, password });
      });
    }
  };

  return { template, init: loginPageInitialize };
};
