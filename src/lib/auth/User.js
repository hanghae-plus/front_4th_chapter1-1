//로컬 스토리지 통해 관리하므로 static 메소드로 구현
class User {
  static getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  static setUser = (user) => {
    const prev = JSON.parse(localStorage.getItem("user"));
    const updatedUser = { ...prev, ...user };
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...updatedUser,
      }),
    );
    return updatedUser;
  };

  static clearUser = () => {
    localStorage.removeItem("user");
    return null;
  };

  static validateUserLogin = (user) => {
    return user.username;
  };
}

export default User;
