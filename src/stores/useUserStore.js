const USER_INFO_LOCAL_STORAGE_KEY = "user";

const createUserStore = () => {
  const storedUserInfo = JSON.parse(
    localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY) || "{}",
  );

  let username = storedUserInfo.username || "";
  let email = storedUserInfo.email || "";
  let bio = storedUserInfo.bio || "";

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

      username = "";
    },
  };
};

export const useUserStore = createUserStore();
