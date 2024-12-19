import { Storage } from "@utils";

// 싱글톤 패턴과 옵저버 패턴을 결합한 상태 관리 스토어
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
        // 상태가 변경될 때마다 등록된 모든 옵저버 함수 실행
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

      // 옵저버 패턴: 상태 변화 감지를 위한 구독 메서드
      // 반환되는 cleanup 함수로 구독 해제 가능
      subscribe: (observer) => {
        observers.push(observer);
        return () => {
          observers = observers.filter((o) => o !== observer);
        };
      },
    };
  };

  // 싱글톤 패턴: 단일 인스턴스 반환
  return () => {
    if (!instance) {
      instance = createStoreInstance();
    }
    return instance;
  };
};

// 싱글톤 인스턴스 생성
// 애플리케이션 전체에서 단일 상태 관리 스토어로 사용
export const UserStore = createStore()();

// const storeCreator = createStore();
// const UserStore = storeCreator();
