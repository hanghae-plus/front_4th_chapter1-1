import UserPreferences from "../utils/userPreference.js";
import Router from "../routes/router.js";

const template = `
<main class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
    <form id="login-form">
      <div class="mb-4">
        <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
      </div>
      <div class="mb-6">
        <input id="userPassword" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
      </div>
      <button id="login-button" type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold" name="로그인"><a id="login-btn" href="#">로그인</a></button>
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

const LoginPage = () => {
  const render = () => {
    document.getElementById("root").innerHTML = template;
  };

  return {
    render,
  };
};

export const loginInit = () => {
  const prefs = new UserPreferences();
  const form = document.getElementById("login-form");
  const email = document.getElementById("username");
  const router = new Router();

  form.addEventListener("submit", (e) => handleLogin(e));
  document
    .getElementById("login-btn")
    .addEventListener("click", (e) => handleLogin(e));

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.value != "") {
      prefs.set("username", email.value);
      prefs.set("email", "");
      prefs.set("bio", "");
      router.navigateTo("/profile");
    }
  };
};

export default LoginPage;
