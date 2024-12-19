// key : routePath에서 사용할 이름, value = pages 컴포넌트 명
export const PagesNameEnum = {
  HOME: "MainPage",
  LOGIN: "LoginPage",
  PROFILE: "ProfilePage",
  ERROR: "ErrorPage",
};

export const PageToPathEnum = {
  [PagesNameEnum.HOME]: "/",
  [PagesNameEnum.LOGIN]: "/login",
  [PagesNameEnum.PROFILE]: "/profile",
  [PagesNameEnum.ERROR]: "/error",
};

export const PathToPageEnum = {
  "/": PagesNameEnum.HOME,
  "/login": PagesNameEnum.LOGIN,
  "/profile": PagesNameEnum.PROFILE,
  "/error": PagesNameEnum.ERROR,
};
