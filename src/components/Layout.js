import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { Navbar } from "./Navbar.js";

export const Layout = (content) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Navbar()}
      ${content}
      ${Footer()}
    </div>
  </div>
`;
