import { Header, Footer, PostForm, Posts } from "../components";

const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div id="container" class="max-w-md w-full">
    ${Header()}
      <main class="p-4">
        ${PostForm()}
        <div class="space-y-4">
          ${Posts()}
        </div>
      </main>
      ${Footer()}
    </div>
  </div>
`;

export default MainPage;
