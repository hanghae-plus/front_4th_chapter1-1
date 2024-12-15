import { Storage } from "@utils";

// 싱글톤 패턴을 사용하여 상태 관리
const createStore = () => {
  let instance;
  let observers = [];

  const initState = {
    isLogin: !!Storage.load("user"),
    user: Storage.load("user") || null,
  };

  const createStoreInstance = () => {
    let state = { ...initState };

    return {
      setState: (newState) => {
        state = {
          ...state,
          ...newState,
        };
        Storage.save("user", state.user);
        // 상태 업데이트 시 관련 컴포넌트 리렌더링을 위한 옵저버 패턴 구현
        observers.forEach((observer) => observer());
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

      // 옵저버 등록 메서드
      subscribe: (observer) => {
        observers.push(observer);
        return () => {
          observers = observers.filter((o) => o !== observer);
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
