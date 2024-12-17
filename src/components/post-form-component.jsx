class PostFormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const element = (
      <form class="mb-4 bg-white rounded-lg shadow p-4">
        <textarea
          class="w-full p-2 border rounded"
          placeholder="무슨 생각을 하고 계신가요?"
        ></textarea>
        <button
          type="submit"
          class="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          게시
        </button>
      </form>
    );

    if (this.firstChild) {
      this.replaceChild(element, this.firstChild);
    } else {
      this.appendChild(element);
    }
  }
}

customElements.define("post-form-component", PostFormComponent);
