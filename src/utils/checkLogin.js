const checkLogin = () => {
  const user = window.localStorage.getItem("user");

  if (!user) {
    return false;
  }
  return true;
};

export default checkLogin;
