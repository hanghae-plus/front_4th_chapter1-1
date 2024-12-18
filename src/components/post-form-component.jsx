import { postsStoreActions } from "../stores/postsStore";
import { userStore } from "../stores/userStore";

class PostFormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  addEvent() {
    const postForm = this.querySelector("#post-form");

    const handleSubmit = (event) => {
      if (event.target === postForm) {
        event.preventDefault();
        this.handleAddForm();
      }
    };

    this.removeEventListener("submit", handleSubmit);
    this.addEventListener("submit", handleSubmit);
  }

  handleAddForm() {
    const postContent = this.querySelector("#post-content");
    const user = userStore.getState();
    const isLogin = user.username;

    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    postsStoreActions.addPost({
      name: user.username,
      createdAt: "1분 전",
      content: postContent.value,
    });
  }

  render() {
    const element = (
      <form id="post-form" class="mb-4 bg-white rounded-lg shadow p-4">
        <textarea
          id="post-content"
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
    this.addEvent();
  }
}

customElements.define("post-form-component", PostFormComponent);
