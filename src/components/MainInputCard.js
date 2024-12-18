import { Button } from "./Button";

export const MainInputCard = () => {
  return `
     <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          ${Button("게시", "button")}
        </div>
    `;
};
