import { PostStore, UserStore } from "../store";
import { hashRouter, pathRouter } from "../route";

const updateUserStore = (data) => {
  new UserStore().set({
    username: data.username,
    email: data.email ?? "",
    bio: data.bio ?? "",
  });
};

const updatePostStore = (username, content) => {
  new PostStore().addPost({
    username: username,
    content: content,
    createdAt: new Date(),
  });
};
const clickEventListener = (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.id === "logout") {
      new UserStore().clear();
    }
    pathRouter(e.target.getAttribute("href"));
  }
};

const submitEventListener = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  if (form.id === "login-form" && data.username) {
    updateUserStore(data);
    pathRouter("/profile");
  }

  if (form.id === "profile-form") {
    updateUserStore(data);
    alert("프로필이 업데이트 되었습니다.");
  }

  if (form.id === "post-form") {
    const user = new UserStore().get();
    if (user.username) {
      updatePostStore(user.username, data.content);
      pathRouter("/");
    }
  }
};

const domContentLoadedEventListener = () => {
  if (window.location.hash) {
    hashRouter();
  } else {
    pathRouter();
  }
};

const hashChangeEventListener = () => {
  hashRouter();
};

const popstateEventListener = () => {
  pathRouter();
};

export const listeners = {
  click: clickEventListener,
  submit: submitEventListener,
  DOMContentLoaded: domContentLoadedEventListener,
  hashchange: hashChangeEventListener,
  popstate: popstateEventListener,
};
