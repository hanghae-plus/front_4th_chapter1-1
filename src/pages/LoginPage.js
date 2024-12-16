import { router } from "../main";

export const LoginPage = () => {
  // //submitBtn.addEventListener를 설정하는 코드가 HTML 요소가
  // //DOM에 추가되기 전에 실행되기 때문에 submitBtn은 null로 평가되어 에러가 발생할 수 있습니다.

  // //이벤트 리스너 등록 시점 문제
  // // •	document.querySelector("#loginSubmit")는 DOM에 id="loginSubmit"를 가진 요소가 존재해야 동작합니다.

  // //해결 방법:
  // //1. 이벤트 리스너를 함수로 분리
  // //HTML 문자열만 반환하고, 이벤트 리스너는 외부에서 등록합니다.
  // //jsx에서는 안에다가 쓰는데, Js는 왜 외부에다가 등록해야 하는데?

  return `<main class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
    <form id='login-form'>
      <div class="mb-4">
        <input type="text" id='username' placeholder="사용자 이름" class="w-full p-2 border rounded">
      </div>
      <div class="mb-6">
        <input type="password" id='password' placeholder="비밀번호" class="w-full p-2 border rounded">
      </div>
      <button type="submit" id='loginSubmit' class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>

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
};

export const addUserInfo = () => {
  const submitBtn = document.querySelector("#login-form");

  if (!submitBtn) return;
  submitBtn.addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = document.querySelector("#username").value;

    if (!userName) {
      console.log("사용자 이름이 비어 있습니다.");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: userName,
        email: "",
        bio: "",
      }),
    );

    window.history.pushState({}, "", "/");

    router();
  });
};

export const checkUserInfo = () => {
  const user = localStorage.getItem("user");

  if (!user) return false;

  if (user) {
    const userData = JSON.parse(user);
    if (userData.username !== "") {
      return true;
    }
  }
};

export const deleteUserInfo = () => {
  const isValidLoggedIn = checkUserInfo();

  const submitBtn = document.querySelector("#logout");

  if (!isValidLoggedIn) return;
  if (!submitBtn) return;

  submitBtn.addEventListener("click", () => {
    localStorage.removeItem("user");

    localStorage.clear();
  });
};
