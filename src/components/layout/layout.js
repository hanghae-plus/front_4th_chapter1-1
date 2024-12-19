import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const Layout = (content) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = userData !== null;

  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header(isLoggedIn)}
        ${content} 
        ${Footer()}
      </div>
    </div>
  `;
};
