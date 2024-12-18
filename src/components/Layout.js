import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";

const Layout = (element) => {
  return `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    ${element.path === "/" || element.path === "/profile" ? Header() + NavBar() : ""}
    ${element.view}      
    ${element.path === "/" || element.path === "/profile" ? Footer() : ""}
    </div>
  </div>    
`;
};

export default Layout;
