export const renderPage = (page) => {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(page());
};
