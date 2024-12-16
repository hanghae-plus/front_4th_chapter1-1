import { set } from "./local-storage";
import { navigate } from "./main";
import { validateUsername } from "./validator";

export const LoginPage = () => {
  const html = `
  <main id="root" class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" id="password"  name="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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

  setTimeout(() => {
    const form = document.querySelector("#root #login-form");

    form.addEventListener("submit", (e) => {
      console.log(`submit pressed`);
      e.preventDefault();

      const formData = new FormData(form);

      const username = formData.get("username");
      const password = formData.get("password");

      //FIXME: 이거 왜 uncaught exception 나오지?
      // const username = document.querySelector("#username").value;
      // const password = document.querySelector("#password").value;

      // const formData.has('username') {

      // }

      console.log(`username: ${username}`);
      console.log(`password: ${password}`);

      if (validateUsername(username)) {
        console.log(`isvalid, go to home page`);
        set("username", username);
        set("password", password);
        navigate("/");
      }
    });
  }, 0);

  return html;
};
