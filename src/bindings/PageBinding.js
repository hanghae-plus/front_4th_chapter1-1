import LoginController from "../controllers/LoginController";
import ProfileController from "../controllers/ProfileController";
import Binding from "../core/Binding";

class PageBinding extends Binding {
  _dependencies() {
    new ProfileController(this.$target);
    new LoginController(this.$target);
  }
}

export default PageBinding;
