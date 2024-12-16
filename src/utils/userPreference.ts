export interface UserInfoType {
  name: string;
  email: string | number;
  introduce?: string;
}

export type UserInfoKeys = keyof UserInfoType;

export const userPreference = (function () {
  let userStorage: UserInfoType | null = init();

  function get(key: UserInfoKeys) {
    return userStorage ? userStorage[key] : null;
  }

  function getAll() {
    return userStorage;
  }

  function set(key: UserInfoKeys, value: string) {
    if (!userStorage) {
      userStorage = {} as UserInfoType;
    }
    userStorage[key] = value;
    save();
  }

  function save() {
    if (userStorage) {
      localStorage.setItem("user", JSON.stringify(userStorage));
    }
  }

  function init() {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as UserInfoType) : null;
  }

  return { get, getAll, set, save };
})();
