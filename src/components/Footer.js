export const Footer = () => {
  const container = document.createElement("footer");

  const render = () => {
    container.innerHTML = `<footer class="bg-gray-200 p-4 text-center">
    <p>&copy; 2024 항해플러스. All rights reserved.</p>
</footer>`;
  };

  render();
  return container;
};
