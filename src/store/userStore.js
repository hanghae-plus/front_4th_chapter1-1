const userStore = {
  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn() {
    return !!userStore.getUser();
  },

  login(username) {
    if (!username.trim()) {
      throw new Error("사용자 이름을 입력해주세요.");
    }

    const userData = {
      username: username,
      email: "",
      bio: "",
    };

    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  },

  logout() {
    localStorage.removeItem("user");
  },

  updateProfile(userData) {
    if (!userStore.isLoggedIn()) {
      throw new Error("로그인이 필요합니다.");
    }

    const currentUser = userStore.getUser();
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  },
};

export default userStore;
