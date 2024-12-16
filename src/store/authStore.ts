import {
  UserInfoKeys,
  UserInfoType,
  userPreference,
} from "../utils/userPreference";

interface StateTypes {
  userInfo: UserInfoType | null;
}

interface ActionTypes {
  useGetUserInfo: () => UserInfoType | null;
  useSetUserInfo: (key: UserInfoKeys, value: string) => void;
  // useSetAllUserInfo: (key: UserInfoKeys, value: string) => void;
}

export const UserStore = (function () {
  const state: StateTypes = {
    userInfo: userPreference.getAll(),
  };

  const actions: ActionTypes = {
    useGetUserInfo: () => {
      return state.userInfo;
    },
    useSetUserInfo: (key: UserInfoKeys, value: string) => {
      userPreference.set(key, value);
    },
  };

  return {
    actions,
    state,
  };
})();
