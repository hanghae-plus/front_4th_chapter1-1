const isLogin = () => {
  const user = window.localStorage.getItem("user");
  return user ? true : false;
};

export default isLogin;
