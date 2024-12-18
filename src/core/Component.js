class Component {
  $target;
  controller;

  constructor($target, controller) {
    this.$target = $target;
    this.controller = controller;

    // 컨트롤러가 있으면 상태 변경 시 자동 리렌더링
    if (this.controller) {
      this.controller.setOnStateChange(() => this.render());
    }

    this.init();
  }

  // 초기화 로직용 훅
  init() {}

  // 렌더링할 템플릿 반환
  template() {
    return ``;
  }

  // DOM 업데이트
  render() {
    this.$target.innerHTML = this.template();
    this.mount();
  }

  // 마운트 훅
  mount() {}
}

export default Component;
