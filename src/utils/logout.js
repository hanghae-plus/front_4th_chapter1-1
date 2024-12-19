const logout = () => {
  window.localStorage.removeItem("user");
};

export default logout;
