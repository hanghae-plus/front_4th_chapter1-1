import {
  UserInfoKeys,
  UserInfoType,
  userPreference,
} from "../utils/userPreference";

interface Observer {
  update(state: StateTypes): void;
}

interface StateTypes {
  userInfo: UserInfoType | null;
}

interface ActionTypes {
  useGetUserInfo: () => UserInfoType | null;
  useSetUserInfo: (key: UserInfoKeys, value: string) => void;
  useSetAllUserInfo: (value: UserInfoType) => void;
  useLogoutUser: () => void;
}

export const UserStore = (function () {
  const observers: Observer[] = [];

  const state: StateTypes = {
    userInfo: userPreference.getAll(),
  };

  function notifyObservers() {
    observers.forEach((observer) => observer.update(state));
  }

  const actions: ActionTypes = {
    useGetUserInfo: () => {
      return state.userInfo;
    },
    useSetUserInfo: (key: UserInfoKeys, value: string) => {
      userPreference.set(key, value);
      state.userInfo = userPreference.getAll();
      notifyObservers();
    },
    useSetAllUserInfo: (value: UserInfoType) => {
      userPreference.setAll(value);
      state.userInfo = value;
      notifyObservers();
    },
    useLogoutUser: () => {
      userPreference.remove();
      state.userInfo = null;
      notifyObservers();
    },
  };

  return {
    actions,
    state,
    addObserver: (observer: Observer) => {
      observers.push(observer);
    },
    removeObserver: (observer: Observer) => {
      const index = observers.indexOf(observer);
      if (index > -1) {
        observers.splice(index, 1);
      }
    },
  };
})();
