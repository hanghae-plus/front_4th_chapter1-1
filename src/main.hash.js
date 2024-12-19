import "./main.js";

/*
import { hashRouter } from "./route.js";
import "./store/index.js";
import { removeUser } from "./store/index.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

// 페이지 렌더링 함수
function render(path) {
  const root = document.getElementById("root");
  console.log("main.hash : " + path);
  const page = hashRouter[path] || hashRouter["/404"];
  if (path === "/" || path === "/profile") {
    root.innerHTML = `<div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        <main id="main" class="p-4"></main>
        ${Footer()}
      </div>
    </div>`;
    page();

    const logoutLink = document.getElementById("logout");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        removeUser();

        navigate("/login");
      });
    }
  } else {
    root.innerHTML = `<main id="main" class="bg-gray-100 flex items-center justify-center min-h-screen">
    </main>`;
    page();
  }
}

// 해시를 기반으로 경로를 반환하는 함수
function getCurrentPath() {
  return window.location.hash.slice(1); // 해시(#) 제거하고 경로 반환, 기본값 "/"
}

// 해시 변경 처리 함수
export function navigate(path) {
  if (`#${path}` === window.location.hash) return; // 동일 경로이면 처리하지 않음
  window.location.hash = path; // 해시 업데이트
}

// 해시 변경 이벤트 처리
window.addEventListener("hashchange", () => render(getCurrentPath()));

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  render(getCurrentPath());
});
*/
