import ROUTES from "./routes";

export default function hashRouter(hash) {
  if (ROUTES[hash]) {
    ROUTES[hash]();
    return;
  }

  ROUTES["*"]();
}
