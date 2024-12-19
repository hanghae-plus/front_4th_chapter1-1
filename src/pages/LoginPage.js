import userInfoStore from "../store/userInfoStore";
import { navigate } from "../utils/navigate";

const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded" required>
        </div>
        <div class="mb-6">
          <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded" autocomplete required>
        </div>
        <button id="login-form-button" type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button type="button" class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
    </div>
  </main>
`;

const submitLoginForm = (e) => {
  e.preventDefault();
  if (e.target.id !== "login-form" || e.type !== "submit") {
    return;
  }

  const form = document.querySelector("#login-form");
  const username = form.querySelector("input[type=text]").value;

  if (username.trim().length === 0) {
    alert("이메일 또는 전화번호를 입력해주세요~!");
  } else {
    userInfoStore.setUserInfo({ username, email: "", bio: "" });
    navigate("/");
  }
};

LoginPage.submitRegister = submitLoginForm;

export default LoginPage;
