const Store = (function () {
  let instance;

  const createStore = (initState = {}) => {
    let state = initState;
    const listeners = new Set();

    return {
      getState: () => state,

      setState: (updater) => {
        state = typeof updater === "function" ? updater(state) : updater;
        listeners.forEach((listener) => {
          listener(state);
        });
      },

      subscribe: (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
    };
  };

  return {
    getInstance: (initState = {}) => {
      if (!instance) {
        instance = createStore(initState);
      }
      return instance;
    },
  };
})();

export default Store;
