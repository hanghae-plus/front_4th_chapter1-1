// key : routePath에서 사용할 이름, value = pages 컴포넌트 명
export const PagesName = {
  HOME: "MainPage",
  LOGIN: "LoginPage",
  PROFILE: "ProfilePage",
  ERROR: "ErrorPage",
};

export const PageToPath = {
  [PagesName.HOME]: "/",
  [PagesName.LOGIN]: "/login",
  [PagesName.PROFILE]: "/profile",
  [PagesName.ERROR]: "/error",
};

export const PathToPage = {
  "/": PagesName.HOME,
  "/login": PagesName.LOGIN,
  "/profile": PagesName.PROFILE,
  "/error": PagesName.ERROR,
};
