import Footer from "./Footer.js";
import Header from "./Header.js";

const Layout = (page) => {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${page()}
        ${Footer()}
      </div>
    </div>
  `;
};

export default Layout;
