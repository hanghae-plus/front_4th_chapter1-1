const checkLogin = () => {
  const loginInfo = window.localStorage.getItem("loginInfo");

  if (!loginInfo) {
    return false;
  }
  return true;
};

export default checkLogin;
