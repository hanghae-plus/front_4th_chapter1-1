export const authStorage = () => {
  const saveLoginInfo = ({ username, email, bio }) => {
    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
  };
  const getLoginInfo = () => {
    const authData = localStorage.getItem("user");
    return authData ? JSON.parse(authData) : null;
  };

  const clearLoginInfo = () => {
    localStorage.removeItem("user");
  };

  return {
    saveLoginInfo,
    getLoginInfo,
    clearLoginInfo,
  };
};
