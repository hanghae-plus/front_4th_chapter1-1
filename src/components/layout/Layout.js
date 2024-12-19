import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

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
