class PostCardComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name");
    const createdAt = this.getAttribute("createdAt");
    const content = this.getAttribute("content");

    const element = (
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center mb-2">
          <img
            src="https://via.placeholder.com/40"
            alt="프로필"
            class="rounded-full mr-2"
          />
          <div>
            <p class="font-bold">{name}</p>
            <p class="text-sm text-gray-500">{createdAt}</p>
          </div>
        </div>
        <p>{content}</p>
        <div class="mt-2 flex justify-between text-gray-500">
          <button>좋아요</button>
          <button>댓글</button>
          <button>공유</button>
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

customElements.define("post-card-component", PostCardComponent);
