import NavbarController from "../controllers/NavbarController";

class ComponentBinding {
  $target;

  constructor($target) {
    this.$target = $target;
    this._dependencies();
  }
  _dependencies() {
    new NavbarController(this.$target);
  }
}

export default ComponentBinding;
