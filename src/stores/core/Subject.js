class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  // 컴포넌트 제거시 옵저버리스트에서 제거해 줘야할 듯.
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  // 컴포넌트 상태 업데이트 및 리렌더 하기 위해 옵저버들에게 데이터 전달
  notifyObservers(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export default Subject;
