class Component {
  $target;
  controller;

  constructor($target, controller) {
    this.$target = $target;
    this.controller = controller;
    if (this.controller) {
      this.controller.setOnStateChange(() => this.render());
    }
    this.init();
  }

  init() {}

  template() {
    return ``;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mount();
  }

  mount() {}
}

export default Component;
