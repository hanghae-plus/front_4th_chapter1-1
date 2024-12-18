class Component {
  $target;
  state;
  controller;

  constructor($target, controller) {
    this.$target = $target;
    this.controller = controller;
    if (this.controller) {
      this.controller.setOnStateChange(() => this.render());
    }
    this.init();
    this.setEvent();
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

  setState(newState) {
    this.state = { ...this.state, ...newState };
    console.log(`setstate : ${this.state.username}`);
    this.render();
  }

  addEvent(eventType, selector, callback) {
    const boundCallback = (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    };

    this.$target.removeEventListener(eventType, boundCallback);
    this.$target.addEventListener(eventType, boundCallback);
  }

  setEvent() {}
}

export default Component;
