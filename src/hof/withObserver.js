export function withObserver(instance = {}) {
  const observers = [];

  instance.subscribe = function (fn) {
    observers.push(fn);
  };

  instance.notify = function () {
    observers.forEach((x) => x.update(instance));
  };

  return instance;
}
