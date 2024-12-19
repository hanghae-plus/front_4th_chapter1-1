export const state = {
  user: null, // 현재 로그인한 사용자 정보
};

const listeners = [];

export const subscribe = (listener) => {
  listeners.push(listener);
};

export const setState = (newState) => {
  Object.assign(state, newState);
  listeners.forEach((listener) => listener());
};
