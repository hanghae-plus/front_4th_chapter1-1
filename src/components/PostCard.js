import { Image } from "./Image";

export const PostCard = (cardData) => `
    <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center mb-2">
           ${Image({ src: cardData.imgUrl, altText: "프로필", className: "rounded-full mr-2" })}
            <div>
                <p class="font-bold">${cardData.name}</p>
                <p class="text-sm text-gray-500">${cardData.createAt}</p>
            </div>
        </div>
        <p>${cardData.contents}</p>
        <div class="mt-2 flex justify-between text-gray-500">
            <button>좋아요</button>
            <button>댓글</button>
            <button>공유</button>
        </div>
    </div>
`;
