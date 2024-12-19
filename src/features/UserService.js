import { USER_KEY } from "../shared/const";

class UserService {
  isLoggedIn = () => !!this.getUser();

  setUser = ({ username, email, bio }) => {
    if (email && !this.isValidEmail(email)) {
      alert("이메일 형식을 확인해주세요.");
    }
    localStorage.setItem(USER_KEY, JSON.stringify({ username, email, bio }));
  };

  getUser = () => {
    return JSON.parse(localStorage.getItem(USER_KEY));
  };

  clearUser = () => {
    return localStorage.removeItem(USER_KEY);
  };

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  isValidEmail = (val) => this.emailRegex.test(val);
}

const userService = new UserService();

export default userService;
