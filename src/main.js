import { MainPage, ErrorPage, ProfilePage, LoginPage } from "./pages/index.js";
import {
  createRoutes,
  // PagesNameEnum,
  PathToPageEnum,
  // PageToPathEnum,
} from "./routes/index.js";

document.body.innerHTML = `
  ${MainPage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${ErrorPage()}
`;

// const { routes, addRoute, navigateTo, handleRoute, handlePopState } =
const { addRoute } = createRoutes();

Object.keys(PathToPageEnum).forEach((path) => {
  addRoute(path, () => {
    // TODO: 각 라우터 경로 별로 등록하고 싶은 함수 추가하기
  });
});
