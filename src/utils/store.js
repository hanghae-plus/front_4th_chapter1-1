const createStore = (initialState) => {
  const listeners = new Set();
  let state = initialState;

  const getState = () => {
    return state;
  };

  const setState = (nextState) => {
    const newState =
      typeof nextState === "function" ? nextState(state) : nextState;

    state = newState;
    notify();
  };

  const subscribe = (listener) => {
    listeners.add(listener);
  };

  const unsubscribe = (listener) => {
    listeners.delete(listener);
  };

  const notify = () => {
    listeners.forEach((listener) => listener(state));
  };

  return {
    getState,
    setState,
    subscribe,
    unsubscribe,
  };
};

export { createStore };
