class Binding {
  $target;

  constructor($target) {
    this.$target = $target;
    this._dependencies();
  }

  // 의존성 주입
  _dependencies() {}
}

export default Binding;
