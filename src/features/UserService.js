import { USER_KEY } from "../shared/const";

class UserService {
  isLoggedIn = () => !!this.getUser();

  setUser = ({ username, email, bio }) => {
    localStorage.setItem(USER_KEY, JSON.stringify({ username, email, bio }));
  };

  getUser = () => {
    console.log(JSON.parse(localStorage.getItem(USER_KEY)));
    return JSON.parse(localStorage.getItem(USER_KEY));
  };

  clearUser = () => {
    return localStorage.removeItem(USER_KEY);
  };

  nameRegex = /^[가-힣a-zA-Z]+$/;
  isValidName = (val) => this.nameRegex.test(val);

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  isValidEmail = (val) => this.emailRegex.test(val);
}

const userService = new UserService();

export default userService;
