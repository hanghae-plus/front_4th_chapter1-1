const USER_INFO_LOCAL_STORAGE_NAME = "user";
export const customLoginEvent = new CustomEvent("login");
export const customEditProfileEvent = new CustomEvent("editProfile");

export const userManager = (() => {
  let username = "";
  let email = "";
  let bio = "";

  const userData = JSON.parse(
    localStorage.getItem(USER_INFO_LOCAL_STORAGE_NAME),
  );

  const {
    username: userNameFromLocalStorage,
    email: emailFromLocalStorage,
    bio: bioFromLocalStorage,
  } = userData ?? {};

  username = userNameFromLocalStorage ?? "";
  email = emailFromLocalStorage ?? "";
  bio = bioFromLocalStorage ?? "";

  return {
    isLogin: () => !!username,
    getData: () => ({ username, email, bio }),
    setUserLocalStorage: (userDataMap) => {
      const refinedUserDataMap = userDataMap ?? {
        username: "",
        email: "",
        bio: "",
      };

      localStorage.setItem(
        USER_INFO_LOCAL_STORAGE_NAME,
        JSON.stringify(refinedUserDataMap),
      );

      username = refinedUserDataMap["username"] ?? "";
    },
    resetUserLocalStorage: () => {
      localStorage.removeItem(USER_INFO_LOCAL_STORAGE_NAME);
    },
  };
})();
