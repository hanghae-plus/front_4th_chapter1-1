export const EventManager = (() => {
  const events = []; // 등록된 이벤트를 저장하는 배열

  const checkAlreadyRegistered = (target, type, listener) => {
    return events.some(
      (e) => e.target === target && e.type === type && e.listener === listener,
    );
  };

  return {
    addEvent(target, type, listener, options) {
      const isAlreadyRegistered = checkAlreadyRegistered(
        target,
        type,
        listener,
      );
      if (isAlreadyRegistered) return;
      target.addEventListener(type, listener, options);
      events.push({ target, type, listener, options });
    },

    clearEvent() {
      console.log("event ", events);
      events.forEach(({ target, type, listener, options }) => {
        target.removeEventListener(type, listener, options);
      });
      events.length = 0; // 배열 초기화
    },
  };
})();
