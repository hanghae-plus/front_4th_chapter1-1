import { ProfilePage } from "./profile";
import { ErrorPage } from "./error";
import { LoginPage } from "./login";
import { MainPage } from "./main";

const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "/404": ErrorPage,
};

const renderPage = () => {
  console.log("renderPage called");
  const path = window.location.pathname;
  // 경로에 맞는 컴포넌트 검색
  const PageComponent = routes[path] || ErrorPage;
  document.getElementById("root").innerHTML = PageComponent();
};

const navigate = (path) => {
  // URL 업데이트
  // console.log('navigate called')
  const newPath = ["/", "/profile", "/login", "/404"].includes(path)
    ? path
    : "/404";
  // console.log(`path: ${path}, newPath: ${newPath}`)
  // "/" : MainPage,
  // "/profile": ProfilePage,
  // "/login": LoginPage,
  // "/404": ErrorPage
  // window.history.pushState({}, "", path);
  window.history.pushState({}, "", newPath);

  // 새 경로에 맞는 페이지 렌더링
  renderPage();
};

document.addEventListener("click", (event) => {
  console.log(`hi`);
  if (event.target.tagName === "A") {
    // 모든 <a> 태그에 대해 처리
    event.preventDefault(); // 기본 동작(페이지 이동) 방지
    navigate(event.target.getAttribute("href")); // 경로 가져오기
  }
});

renderPage();

// 뒤로가기/앞으로가기 이벤트 감지
window.addEventListener("popstate", renderPage);
