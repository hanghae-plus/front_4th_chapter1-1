const USER_INFO_LOCAL_STORAGE_KEY = "user";

const createUserStore = () => {
  let username = "";
  let email = "";
  let bio = "";

  return {
    isLogin: () => !!username,
    getUserInfo: () => ({
      username,
      email,
      bio,
    }),
    setUserInfoInLocalStorage: (userInfo) => {
      const newUserInfo = userInfo ?? {
        username: "",
        email: "",
        bio: "",
      };

      username = newUserInfo.username;

      localStorage.setItem(
        USER_INFO_LOCAL_STORAGE_KEY,
        JSON.stringify(newUserInfo),
      );
    },
    resetUserInfoInLocalStorage: () => {
      localStorage.removeItem(USER_INFO_LOCAL_STORAGE_KEY);
    },
  };
};

export const useUserStore = createUserStore();
