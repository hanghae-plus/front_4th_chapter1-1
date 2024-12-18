class Binding {
  $target;

  constructor($target) {
    this.$target = $target;
    this._dependencies();
  }
  _dependencies() {}
}

export default Binding;
