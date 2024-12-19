const userInfoStore = {
  getUserInfo: () => {
    const stringUserInfo = localStorage.getItem("user");
    const userInfo = stringUserInfo ? JSON.parse(stringUserInfo) : null;
    return userInfo;
  },

  setUserInfo: (newValue) => {
    localStorage.setItem("user", JSON.stringify(newValue));
    window.dispatchEvent(new Event("popstate"));
  },

  clearUserInfo: () => {
    localStorage.clear("user");
    window.dispatchEvent(new Event("popstate"));
  },
};

export default userInfoStore;
