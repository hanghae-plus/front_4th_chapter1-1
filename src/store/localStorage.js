export const setItem = (key, value) => {
  // TODO : 입력 검증 로직 나중에 추가하기
  if (typeof key !== "string" || typeof value !== "object")
    throw new Error("🚧 : 입력값이 잘못되었습니다.");

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  // TODO : 입력 검증 로직 나중에 추가하기
  if (typeof key !== "string") throw new Error("🚧 : 입력값이 잘못되었습니다.");

  return window.localStorage.getItem(key);
};

export const removeItem = (key) => {
  // TODO : 입력 검증 로직 나중에 추가하기
  if (typeof key !== "string") throw new Error("🚧 : 입력값이 잘못되었습니다.");

  window.localStorage.removeItem(key);
};
