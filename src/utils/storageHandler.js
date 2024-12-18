// 로컬 스토리지에서 데이터 가져오기
export const getStorage = (key) => localStorage.getItem(key);

// 로컬 스토리지에 데이터 저장
export const setStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

// 로컬 스토리지 초기화
export const clearStorage = () => localStorage.clear();
