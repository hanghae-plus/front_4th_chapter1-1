import Footer from "../components/Footer";
import Header from "../components/Header";
import userStore from "../store/UserStore.js";
import postStore from "../store/PostStore.js";
import renderPosts from "../components/RenderPosts.js";
import time from "../formatter/DateFormmat.js";

const MainPage = () => {
  const { html: Headers, init: Initial } = Header();
  const LoginState = userStore.LoginState();
  const user = userStore.getUser();
  let posts = postStore.getPost();

  const html = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
       ${Headers}
        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea id="postinput" name="postinput" class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button id="postbutton" name="postbutton" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>
          <div class="space-y-4">
            ${renderPosts(posts)}
          </div>
        </main>
        ${Footer()}
      </div>
    </div>
  `;

  const init = () => {
    Initial();
    const postbtn = document.querySelector("#postbutton");
    postbtn.addEventListener("click", (e) => {
      e.preventDefault();
      const post = document.querySelector(`textarea[name= "postinput"]`)?.value;
      LoginState &&
        postStore.setPost({
          username: user?.username ?? "",
          post,
          time,
        });
      posts = postStore.getPost();
      document.querySelector(".space-y-4").innerHTML = renderPosts(posts);
    });
  };
  return { html, init };
};

export default MainPage;
