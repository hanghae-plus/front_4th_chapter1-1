import { PostCard } from "../components/PostCard";
import { postCardList } from "../constant/data";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const HomePage = {
  render: () => {
    return `
  ${Header()}
    <main main class="p-4">
      <div class="mb-4 bg-white rounded-lg shadow p-4">
        <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
        <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
      </div>

      <div class="space-y-4">
        ${postCardList.map((cardItem) => PostCard(cardItem)).join("")}
      </div>
    </main>
  ${Footer()}   
`;
  },
};
