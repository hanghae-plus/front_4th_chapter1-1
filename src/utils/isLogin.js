const isLogin = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

export default isLogin;
