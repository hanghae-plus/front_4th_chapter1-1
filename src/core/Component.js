class Component {
  $target;
  state;

  constructor($target) {
    this.$target = $target;
    this.init();
    this.setEvent();
    this.render();
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

    // 기존에 동일한 이벤트 리스너가 있는지 확인 후 제거
    this.$target.removeEventListener(eventType, boundCallback);
    this.$target.addEventListener(eventType, boundCallback);
  }

  setEvent() {}
}

export default Component;
