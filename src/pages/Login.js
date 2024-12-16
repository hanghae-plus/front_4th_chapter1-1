import Component from "../core/component";
import { login } from "../auth/auth";
import Router from "../router/router";

class LoginPage extends Component {
  setEvent() {
    this.addEvent("click", ".loginSubmitBtn", (e) => {
      e.preventDefault();
      console.log("Login Page addEvent : loginSubmit");
      const username = this.$target.querySelector(".username").value.trim();
      const password = this.$target.querySelector(".password").value.trim();

      if (!username || !password) {
        return;
      }

      login(username);

      const router = Router.instance;
      router.navigate("/");
    });
  }

  template() {
    return `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="loginForm">
        <div class="mb-4">
          <input type="text" placeholder="이메일 또는 전화번호" class="username w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password"placeholder="비밀번호" class="password w-full p-2 border rounded">
        </div>
        <button type="submit" class="loginSubmitBtn w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
    </div>
  </main>`;
  }
}

export default LoginPage;
