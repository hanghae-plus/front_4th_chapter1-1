export const userService = (() => {
  let user =
    localStorage.getItem("user") != null
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  let userProfile =
    localStorage.getItem("userProfile") != null
      ? JSON.parse(localStorage.getItem("userProfile"))
      : {
          username: "홍길동",
          email: "",
          bio: "",
        };

  return {
    isLogin: () => {
      return user == null ? false : true;
    },
    login: (_user) => {
      user = _user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: () => {
      user = null;
      localStorage.removeItem("user");
    },
    updateProfile: (profile) => {
      userProfile = profile;
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    },
    get userProfile() {
      return userProfile;
    },
  };
})();
