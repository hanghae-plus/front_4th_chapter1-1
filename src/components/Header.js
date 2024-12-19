export const Header = () => {
  const user = localStorage.getItem("user");

  document.addEventListener("click", (e) => {
    if (e.target.id === "logout") {
      e.preventDefault();
      localStorage.removeItem("user");
      window.history.pushState({}, "", "/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  });

  if (!user)
    return `
    <div>
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${window.location.pathname === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
          <li><a href="/login" class="${window.location.pathname === "/login" ? "text-blue-600" : "text-gray-600"}">로그인</a></li>
        </ul>
      </nav>
    </div>
    `;

  return `
    <div>
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${window.location.pathname === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
          <li><a href="/profile" class="${window.location.pathname === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
          <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>
    </div>
    `;
};
