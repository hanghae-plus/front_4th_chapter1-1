export const Layout = () => {
  return `<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <div id="headerWrapper">
      </div>

      <div id="content"></div>

      <div id="footerWrapper"></div>
    </div>
  </div>
`;
};

export const Header =
  () => `<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
     `;

export const Navigation =
  () => ` <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" id="homeLink">홈</a></li>
          <li><a href="/profile" id="profileLink">프로필</a></li>
          <li><a id="signLink" href="#"></a></li>
        </ul>
      </nav>`;

export const Footer =
  () => `<div id="footerWrapper"><footer class="bg-gray-200 p-4 text-center" id="footerSection">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer></div>`;
