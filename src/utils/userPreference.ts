export interface UserInfoType {
  username: string;
  email?: string | number;
  bio?: string;
}

export type UserInfoKeys = keyof UserInfoType;

const USER_STORAGE_KEY = "user";

export const userPreference = (function () {
  let userStorage: UserInfoType | null = init();

  function get(key: UserInfoKeys) {
    return userStorage?.[key] ?? null;
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

  function setAll(value: UserInfoType | null) {
    const newUserStorage = value;

    userStorage = newUserStorage;

    save();
  }

  function remove() {
    localStorage.removeItem(USER_STORAGE_KEY);
    userStorage = null;
  }

  function save() {
    if (userStorage) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userStorage));
    }
  }

  function init() {
    const user = localStorage.getItem(USER_STORAGE_KEY);
    return user ? (JSON.parse(user) as UserInfoType) : null;
  }

  return { get, getAll, set, setAll, save, remove };
})();
