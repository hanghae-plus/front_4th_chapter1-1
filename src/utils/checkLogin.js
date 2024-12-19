import { getUser } from "./user";

const checkLogin = () => {
  const user = getUser();

  if (!user) {
    return false;
  }
  return true;
};

export default checkLogin;
