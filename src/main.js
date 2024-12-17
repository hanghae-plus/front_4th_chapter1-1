import { ProfilePage } from "./profile";
import { NotFoundPage } from "./error";
import { LoginPage } from "./login";
import { HomePage } from "./home";
import { isLoggedIn } from "./local-storage";

const routes = {
  "/": HomePage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "/404": NotFoundPage,
};

// return ProfilePage();

const renderPage = () => {
  console.log("renderPage called");
  const path = window.location.pathname;
  // 경로에 맞는 컴포넌트 검색
  const PageComponent = routes[path] || NotFoundPage;
  document.getElementById("root").innerHTML = PageComponent();
};

export const navigate = (path) => {
  // URL 업데이트
  let newPath = ["/", "/profile", "/login", "/#", "/404"].includes(path)
    ? path
    : "/404";

  if (newPath === "/profile" && !isLoggedIn()) {
    newPath = "/login";
  }

  window.history.pushState({}, "", newPath);

  // 새 경로에 맞는 페이지 렌더링
  renderPage();
};

document.addEventListener("click", (event) => {
  //   console.log(`hi`);
  if (event.target.tagName === "A") {
    // 모든 <a> 태그에 대해 처리
    event.preventDefault(); // 기본 동작(페이지 이동) 방지
    navigate(event.target.getAttribute("href")); // 경로 가져오기
  }
});

renderPage();

// 뒤로가기/앞으로가기 이벤트 감지
window.addEventListener("popstate", renderPage);
