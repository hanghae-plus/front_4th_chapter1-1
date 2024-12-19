import storage from "@/util/storage";

export class User {
  constructor() {
    if (User.instance) {
      return UserStore.instance;
    }
    User.instance = this;
    this.state = {};
    return this;
  }

  checkLogin() {
    return !!storage.get("user");
  }
  geUser() {
    return storage.get("user");
  }
  setUser(userInfo) {
    storage.set("user", userInfo);
  }
  logout() {
    storage.remove("user");
  }
}
const UserStore = new User();
Object.freeze(UserStore);
export default UserStore;
