import {
  ACCOUNT_STORAGE_KEY,
  LOGGED_IN_STATE_STORAGE_KEY,
} from "../../constants";

const authService = () => ({
  signUp: (username) => {
    try {
      // const accounts =
      //   JSON.parse(localStorage.getItem(ACCOUNT_STORAGE_KEY)) || {};

      // if (accounts[username]) {
      //   throw new Error("이미 존재하는 계정");
      // }

      localStorage.setItem(
        ACCOUNT_STORAGE_KEY,
        JSON.stringify({
          username,
          email: "",
          bio: "",
        }),
      );

      return { success: true, message: "계정 생성 성공" };
    } catch (error) {
      throw new Error(`계정 생성 실패: ${error.message}`);
    }
  },

  signIn: (username) => {
    try {
      localStorage.setItem(
        ACCOUNT_STORAGE_KEY,
        JSON.stringify({
          username,
          email: "",
          bio: "",
        }),
      );
      localStorage.setItem(LOGGED_IN_STATE_STORAGE_KEY, JSON.stringify(true));

      return { success: true, message: "로그인 성공" };
    } catch (error) {
      throw new Error(`로그인 실패: ${error.message}`);
    }
  },

  signOut: () => {
    try {
      localStorage.setItem(LOGGED_IN_STATE_STORAGE_KEY, JSON.stringify(false));
      localStorage.removeItem(ACCOUNT_STORAGE_KEY);
      return { success: true, message: "로그아웃 성공" };
    } catch (error) {
      throw new Error(`로그아웃 실패: ${error.message}`);
    }
  },
});

export const signUp = (username) => authService().signUp(username);
export const signIn = (username) => authService().signIn(username);
export const signOut = () => authService().signOut();
