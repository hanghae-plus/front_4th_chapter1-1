import { NotFound } from "../components/NotFound";

export const NotFoundPage = () => {
  const container = document.createElement("div");

  container.appendChild(NotFound());

  return container;
};
