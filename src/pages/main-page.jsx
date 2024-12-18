import { postsStore } from "../stores/posts-store";

class MainPage extends HTMLElement {
  constructor() {
    super();
    postsStore.subscribe(this.render.bind(this));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const posts = postsStore.getState();
    const element = (
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <header-component></header-component>
          <nav-component></nav-component>
          <main class="p-4">
            <post-form-component></post-form-component>
            <div class="flex flex-col space-y-4">
              {posts.map((post) => (
                <post-card-component {...post}></post-card-component>
              ))}
            </div>
          </main>
          <footer-component></footer-component>
        </div>
      </div>
    );

    if (this.firstChild) {
      this.replaceChild(element, this.firstChild);
    } else {
      this.appendChild(element);
    }
  }
}

customElements.define("main-page", MainPage);
