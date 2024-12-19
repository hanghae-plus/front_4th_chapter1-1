import Header from "./Components/Header.js"; // export default인 경우
import Footer from "./Components/Footer.js"; // export default인 경우

const ServicePage = (targetPage) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${targetPage()}
      ${Footer()}
    </div>
  </div>
`;

export default ServicePage;
