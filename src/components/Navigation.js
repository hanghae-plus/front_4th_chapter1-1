import { checkUserInfo } from "../pages/LoginPage";

export const Navigation = () => {
  const isValidLoggedIn = checkUserInfo();

  return `
       <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li>  
          ${
            isValidLoggedIn
              ? `<a href="/profile" id='profile'  class=" text-gray-600"
   >프로필</a>`
              : `<a href="/login"  class="text-blue-600">로그인</a>`
          }
          </li>
           <li class="${isValidLoggedIn ? "" : "display-hidden"}">
           ${
             isValidLoggedIn
               ? `<a href="/login" id='logout' class="text-gray-600}">로그아웃</a>`
               : ""
           }
          </li>
         
       </ul>
      </nav>
    `;
};
