import { MainPage, ErrorPage, ProfilePage, LoginPage } from "./pages/index.js";
import { createRoutes, PagesNameEnum, PathToPageEnum } from "./routes/index.js";

const { addRoute, navigateTo } = createRoutes();

const RenderingEnum = {
  [PagesNameEnum.HOME]: MainPage(),
  [PagesNameEnum.LOGIN]: LoginPage(),
  [PagesNameEnum.PROFILE]: ProfilePage(),
  [PagesNameEnum.ERROR]: ErrorPage(),
};

const render = (htmlTemplateLiteral) => {
  document.body.innerHTML = htmlTemplateLiteral;
};

// 라우트 추가
Object.keys(PathToPageEnum).forEach((path) => {
  addRoute(path, () => {
    render(RenderingEnum[PathToPageEnum[path]]);
  });
});

// TODO: 앵커태그시 새로고침 안되게 수정, 지금은 앵커태그 전체에 적용되는데...?
window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    navigateTo(e.target.getAttribute("href"));
  }
});
