class Controller {
  state;

  static instance = null;

  constructor($target) {
    if (this.constructor.instance) {
      return this.constructor.instance;
    }
    this.constructor.instance = this;
    this.$target = $target;
    this.state = {};
    this.onInit();
  }

  onInit() {
    this.attachListeners();
  }

  addListener(eventType, selector, callback) {
    const boundCallback = (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    };

    console.log(this.$target);
    this.$target.removeEventListener(eventType, boundCallback);
    this.$target.addEventListener(eventType, boundCallback);
  }

  attachListeners() {}

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
  }

  dispose() {
    this.constructor.instance = null;
  }
}

export default Controller;
