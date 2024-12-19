import { RenderingEnum } from "./utils/shared/index.js";
import { createRoutes, PathToPageEnum } from "./routes/index.js";
import { render } from "./utils/render.js";
import { clickHandler, submitHandler } from "./utils/index.js";

export const init = () => {
  const { addRoute } = createRoutes();

  // 라우트 추가
  Object.keys(PathToPageEnum).forEach((path) => {
    addRoute(path, () => {
      render(RenderingEnum[PathToPageEnum[path]]);
    });
  });

  window.addEventListener("click", clickHandler);
  window.addEventListener("submit", submitHandler);
};
