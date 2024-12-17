import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

export const Layout = (content) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${content}
      ${Footer()}
    </div>
  </div>
`;
