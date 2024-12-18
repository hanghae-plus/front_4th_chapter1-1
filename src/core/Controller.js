class Controller {
  state;
  static _instance = null;

  static get instance() {
    if (!this._instance) {
      throw new Error(`Instance of ${this.name} has not been created yet.`);
    }
    return this._instance;
  }

  constructor($target) {
    // 싱글톤 패턴
    if (this.constructor._instance) {
      return this.constructor._instance;
    }
    this.constructor._instance = this;

    this.$target = $target;
    this.onStateChange = null;
    this.state = {};
    this._onInit();
  }

  // 초기화 시 attachListeners 호출
  _onInit() {
    this.attachListeners();
  }

  // 이벤트 리스너 등록 헬퍼 메서드
  addListener(eventType, selector, callback) {
    const boundCallback = (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    };
    // 기존 리스너 제거 후 새 리스너 추가
    this.$target.removeEventListener(eventType, boundCallback);
    this.$target.addEventListener(eventType, boundCallback);
  }

  // 리스너를 등록하는 훅, 하위 클래스에서 구현
  attachListeners() {}

  // 상태 변경 시 onStateChange 콜백 실행
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.onStateChange();
  }

  // 상태 변경 시 호출할 콜백 설정
  setOnStateChange(callback) {
    this.onStateChange = callback;
  }

  // 컨트롤러 해제 시 인스턴스 제거
  dispose() {
    this.constructor.instance = null;
  }
}

export default Controller;
