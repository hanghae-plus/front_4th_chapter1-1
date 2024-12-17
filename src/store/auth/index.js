import {
  ACCOUNT_STORAGE_KEY,
  LOGGED_IN_STATE_STORAGE_KEY,
} from "../../constants";

const authService = () => ({
  signUp: ({ id, password }) => {
    try {
      const accounts =
        JSON.parse(localStorage.getItem(ACCOUNT_STORAGE_KEY)) || {};

      if (accounts[id]) {
        throw new Error("이미 존재하는 계정");
      }

      accounts[id] = { password };
      localStorage.setItem(
        ACCOUNT_STORAGE_KEY,
        JSON.stringify({
          username: id,
          email: "",
          bio: "",
        }),
      );

      return { success: true, message: "계정 생성 성공" };
    } catch (error) {
      throw new Error(`계정 생성 실패: ${error.message}`);
    }
  },

  signIn: ({ id, password }) => {
    try {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: id,
          email: "",
          bio: "",
        }),
      );
      console.log(id, password);
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

export const signUp = ({ id, password }) =>
  authService().signUp({ id, password });
export const signIn = ({ id, password }) =>
  authService().signIn({ id, password });
export const signOut = () => authService().signOut();
