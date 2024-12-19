import loginPage from "./pages/loginPage";
import mainPage from "./pages/mainPage";
import profilePage from "./pages/profilePage";
import errorPage from "./pages/errorPage";

//url변경
export function navigateTo(url) {
  window.history.pushState(null, null, url);
  renderPage();
}

//페이지 렌더링
function renderPage() {
  const route = window.location.pathname;
  const rootDiv = document.getElementById("root"); // root div 가져오기
  let component;
  switch (route) {
    case "/":
      component = mainPage();
      // rootDiv.innerHTML = MainPage(); // MainPage 렌더링
      break;
    case "/login":
      component = loginPage();
      break;
    case "/profile":
      if (!chkLogin()) {
        return;
      }
      component = profilePage(); // ProfilePage 렌더링
      break;
    default:
      component = errorPage();
  }
  rootDiv.innerHTML = ""; // 기존 내용을 비우기
  rootDiv.appendChild(component); // LoginPage 추가
}

function chkLogin() {
  if (!window.localStorage.getItem("user")) {
    // 로그인이 되지 않았다면
    navigateTo("/login");
    return false;
  } else {
    return true;
  }
}

window.addEventListener("popstate", renderPage);
window.addEventListener("load", renderPage);
