import { CreateStore } from "../createStore.js";

class UserStore extends CreateStore {
  constructor() {
    const userInfo = JSON.parse(localStorage.getItem("user")) || null;
    super(userInfo);
  }
}

export const userStore = new UserStore();
