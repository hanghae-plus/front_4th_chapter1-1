import LoginController from "../controllers/LoginController";
import ProfileController from "../controllers/ProfileController";
import ErrorPage from "./Error";
import LoginPage from "./Login";
import MainPage from "./Main";
import ProfilePage from "./Profile";

const createPageFactory = ($target) => {
  const mainInstance = new MainPage($target);
  const errorInstance = new ErrorPage($target);
  const loginInstance = new LoginPage($target, new LoginController());
  const profileInstance = new ProfilePage($target, new ProfileController());

  return {
    main: () => mainInstance,
    error: () => errorInstance,
    login: () => loginInstance,
    profile: () => profileInstance,
  };
};

export default createPageFactory;
