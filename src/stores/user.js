import { Storage } from "@utils";

// 싱글톤 패턴을 사용하여 상태 관리
const createStore = () => {
  let instance;

  const initState = {
    isLogin: !!Storage.load("user"),
    user: Storage.load("user") || null,
  };

  const createStoreInstance = () => {
    let state = { ...initState };

    return {
      setState: (newState) => {
        state = {
          ...newState,
        };
        Storage.save("user", state.user);
        console.log(localStorage.getItem("user"));
      },
      getState: () => state,
      getValue: (key) => state[key],
      clearState: () => {
        Storage.clear();
        state = {
          isLogin: false,
          user: null,
        };
      },
    };
  };

  return () => {
    if (!instance) {
      instance = createStoreInstance();
    }
    return instance;
  };
};

// 클로저를 사용한 싱글톤 패턴 구현으로, 첫 번째 호출 시 스토어 생성하고 두 번째 호출 시 인스턴스를 반환한다.
export const UserStore = createStore()();
