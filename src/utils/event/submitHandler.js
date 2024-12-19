import { login } from "../auth.js";
import { LoginEnum } from "../shared/loginEnum.js";

export const submitHandler = (event) => {
  event.preventDefault();

  const form = event.target;
  if (form.getAttribute("id") !== "login-form") return;

  const formData = new FormData(form);
  const userInfo = {
    id: formData.get(LoginEnum.ID),
    passwd: formData.get(LoginEnum.PASSWORD),
  };

  login(userInfo.id, userInfo.passwd);
};
