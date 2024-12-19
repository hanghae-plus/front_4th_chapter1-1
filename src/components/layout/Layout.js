import Footer from "./Footer";
import Header from "./Header";

const Layout = (children) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${children()}
      ${Footer()}
    </div>
  </div>
`;

export default Layout;
