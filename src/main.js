import { App } from "./app";
import { Renderer } from "./Renderer";

// Q.왜 load로 이벤트 속성을 걸면 렌더링이 안되는거지?
document.addEventListener("DOMContentLoaded", () => {
  App.render();
});
// NOTE : history.go() history.back() history.forward() 매소드 호출시 해당 이벤트 트리거 됨.
// 확인해보니 PopState는 뒤로 앞으로 가기를 담당
Renderer.onPopState(() => App.render());
Renderer.onPushState(() => App.render());
Renderer.onReplaceState(() => App.render());
Renderer.onHashChange(() => App.render());
Renderer.onATagClick(() => App.render());
