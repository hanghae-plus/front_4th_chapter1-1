const isLogin = () => {
  const loginInfo = window.localStorage.getItem("loginInfo");
  return loginInfo ? true : false;
};

export default isLogin;
