import { withObserver } from "../hof/withObserver";

export function createApp({ renderCurrentPage }) {
  function render() {
    document.getElementById("root").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        window.history.pushState({}, "", e.target.getAttribute("href"));
      }
    });

    renderCurrentPage();
  }

  return withObserver({
    update: render,
    init: () => {
      window.addEventListener("load", render);
    },
  });
}
