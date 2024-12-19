export function withObserver(instance = {}) {
  const observers = [];

  instance.subscribe = function (observer) {
    observers.push(observer);
  };

  instance.notify = function () {
    observers.forEach((x) => x.update(instance));
  };

  return instance;
}
