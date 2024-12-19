import { MainPage, ErrorPage, ProfilePage, LoginPage } from "./pages/index.js";
import { createRoutes, PagesNameEnum, PathToPageEnum } from "./routes/index.js";

// ${ProfilePage()}
// ${LoginPage()}
// ${ErrorPage()}

document.body.innerHTML = `
  ${MainPage()}
`;

const { addRoute, navigateTo } = createRoutes();

const RenderingEnum = {
  [PagesNameEnum.HOME]: MainPage(),
  [PagesNameEnum.LOGIN]: LoginPage(),
  [PagesNameEnum.PROFILE]: ProfilePage(),
  [PagesNameEnum.ERROR]: ErrorPage(),
};

Object.keys(PathToPageEnum).forEach((path) => {
  addRoute(path, () => {
    document.body.innerHTML = RenderingEnum[PathToPageEnum[path]];
  });
});

window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    navigateTo(e.target.getAttribute("href"));
  }
});
