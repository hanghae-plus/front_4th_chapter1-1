import { useLoginForm } from "../model/use-login-form";

function LoginForm() {
  const { handleSubmit } = useLoginForm();

  document.addEventListener("submit", handleSubmit);

  return `
    <form id="login-form">
      <div class="mb-4">
        <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
      </div>
      <div class="mb-6">
        <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
      </div>
      <button id="login-button" type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
    </form>
  `;
}

export { LoginForm };
