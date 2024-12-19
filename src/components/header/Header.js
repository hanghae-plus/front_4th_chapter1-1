import NavBar from "./NavBar";

const Header = function () {
  function render() {
    return `<div>
    <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
  ${NavBar()}
  </div>`;
  }

  return render();
};

export default Header;
