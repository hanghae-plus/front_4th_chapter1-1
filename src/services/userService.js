import { store } from "../store";

const DEFAULT_USER_INFO = {
  username: "",
  email: "",
  bio: "",
};

// NOTE: 즉시 실행 함수에 정리해볼 필요가 있다. 함수를 실행하여 반환된 객체를 userSerive 변수에 할당한 것. 코드 은닉에 이점
export const userService = (() => {
  return {
    isLogin: () => {
      return store.get("user") != null;
    },
    login: (user) => {
      store.set(
        "user",
        {
          ...DEFAULT_USER_INFO,
          ...user,
        },
        { persistent: true },
      );
    },
    logout: () => {
      store.remove("user");
    },
    updateProfile: (profile) => {
      const user = store.get("user");
      store.set(
        "user",
        {
          ...user,
          ...profile,
        },
        { persistent: true },
      );
    },
    get userProfile() {
      return store.get("user") ?? DEFAULT_USER_INFO;
    },
  };
})();
