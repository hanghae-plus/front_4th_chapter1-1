import { Header, Footer } from "@/layout";

export const DefaultLayout = (content) => {
  return `
    <div id="root" class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${content} 
        ${Footer()}
      </div>
    </div>
  `;
};
