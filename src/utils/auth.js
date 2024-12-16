const ACCOUNT_STORAGE_KEY = "account";

/**
 * @param {string} id - 사용자 ID
 * @param {string} password - 사용자 PASSWORD
 * @throws {Error} - ID 중복 시 에러 발생
 * @returns {Object} - 계정 생성 결과
 * @returns {boolean} - result.success - 계정 생성 성공 여부
 */
export const createAccount = ({ id, password }) => {
  const accounts = JSON.parse(localStorage.getItem(ACCOUNT_STORAGE_KEY)) || {};

  if (accounts[id]) {
    throw new Error("이미 존재하는 계정");
  }

  accounts[id] = { id, password };
  localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accounts));

  return { success: true, message: "계정 생성 성공" };
};

export const login = ({ id, password }) => {
  const accounts = JSON.parse(localStorage.getItem(ACCOUNT_STORAGE_KEY)) || {};

  if (!accounts[id]) {
    throw new Error("존재하지 않는 계정");
  }

  if (accounts[id].password !== password) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  return { success: true, message: "로그인 성공" };
};
