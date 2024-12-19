const render = (route) => {
  const root = document.getElementById("root");
  root.innerHTML = route();
};

export default render;
