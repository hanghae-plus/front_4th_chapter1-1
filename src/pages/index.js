import ErrorPage from "./Error";
import LoginPage from "./Login";
import MainPage from "./Main";
import ProfilePage from "./Profile";

const createPageFactory = ($target) => {
  const main = () => new MainPage($target);
  const error = () => new ErrorPage($target);
  const login = () => new LoginPage($target);
  const profile = () => new ProfilePage($target);

  return {
    main,
    error,
    login,
    profile,
  };
};

export default createPageFactory;
