import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LikedBar } from "../components/LikedBar";
import { MainInputCard } from "../components/MainInputCard";
import { Navigation } from "../components/Navigation";

import { HOME_DATA } from "../lib/data";

export const MainPage = () => {
  return ` 
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
     
      ${Header()}
      ${Navigation()}

      <main class="p-4">
       ${MainInputCard()}
        <div class="space-y-4">
        ${HOME_DATA.map((data) => {
          return `<div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center mb-2">
                <img src="${data.url}" alt="프로필" class="rounded-full mr-2">
                <div>
                  <p class="font-bold">${data.username}</p>
                  <p class="text-sm text-gray-500">${data.lastTime}</p>
                </div>
              </div>
              <p>${data.content}</p>
            ${LikedBar()}
            </div>`;
        })}
        </div>
      </main>
     ${Footer()}
    </div>
  </div>`;
};
