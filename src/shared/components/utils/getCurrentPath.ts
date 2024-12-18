export const getCurrentPath = () => {
  if (window.ROUTE_MODE === "hash") {
    return window.location.hash.slice(1);
  }
  return window.location.pathname;
};
