import { validateUserHash, validateUserPath } from "../validate";
import { pathRoute, hashRoute } from "./route.js";
import render from "./render.js";

const validatePath = (validateFunc, path) => {
  const validated = validateFunc(path);
  if (path.includes("#")) {
    window.location.hash = validated;
  } else {
    history.pushState(null, null, validated);
  }
  return validated;
};

export const pathRouter = (path) => {
  if (window.location.hash) {
    return hashRouter(path);
  }
  if (window.location.pathname === "/index.hash.html") {
    return hashRouter("#/");
  }
  path = path ?? window.location.pathname;
  const validatedPath = validatePath(validateUserPath, path);
  render(pathRoute(validatedPath));
};

export const hashRouter = (hash) => {
  let newHash = hash ?? window.location.hash;
  if (!newHash.includes("#")) {
    newHash = `#${newHash}`;
  }
  const validatedHash = validatePath(validateUserHash, newHash);
  render(hashRoute(validatedHash));
};
