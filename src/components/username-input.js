import { UserStore } from "../store";

const UsernameInput = () => {
  return `<input name="username" id="username" type="hidden" value="${new UserStore().get().username}"/>`;
};

export default UsernameInput;
