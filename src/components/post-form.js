import UsernameInput from "./username-input.js";
import { UserStore } from "../store";

const PostForm = () => {
  return `
    <form id="post-form">
      <div class="mb-4 bg-white rounded-lg shadow p-4">
        <textarea name="content" id="content" class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
        ${new UserStore().get()?.username ? UsernameInput() : ""}
        <button type="submit" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
      </div>
    </form>`;
};

export default PostForm;
