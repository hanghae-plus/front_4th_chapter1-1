const render = (component) => {
  const root = document.getElementById("root");

  root.innerHTML = `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${component}
        </div>
      </div>
    `;
};
export default render;
