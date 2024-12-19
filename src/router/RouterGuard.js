import userStore from "../store/UserStore.js";

const routerGuard = (path) => {
  const loginState = userStore.LoginState();
  const redirects = {
    "/profile": loginState ? path : "/login",
    "/login": loginState ? "/" : path,
  };
  return redirects[path] ?? path;
};

export default routerGuard;
