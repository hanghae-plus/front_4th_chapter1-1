class Component {
  $target;
  state;
  controller;

  constructor($target) {
    this.$target = $target;
    this.setContoller();
    this.init();
    this.setEvent();
  }

  init() {}

  setContoller() {}

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
