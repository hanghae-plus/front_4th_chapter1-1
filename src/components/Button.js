//로그인
//홈-게시
//프로필-프로필 업데이트

export const Button = (name, type) => {
  return `
     <button
       type="${type}"
       class="w-full bg-blue-600 text-white p-2 rounded font-bold"
       >
       ${name}
       </button>
    `;
};
