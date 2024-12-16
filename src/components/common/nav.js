import UserPreferences from "../../utils/userPreference";

const Nav = () => {
  const pref = new UserPreferences();
  const updateNav = () => {
    const username = pref.get("username");
    const currentPage = window.location.pathname;
    console.log(username);

    const navEl = document.querySelector("nav");
    if (navEl) {
      navEl.innerHTML = `
        <ul class="flex justify-around">
        <li><a id="home" href="/" class="${currentPage === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
        ${username ? `<li><a id="profile" href="/profile" class="${currentPage === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>` : ""}
        <li><a id=${username ? "logout" : "login"} href="/login" class="text-gray-600">${username ? "로그아웃" : "로그인"}</a></li>
        </ul>
    `;
    }
  };

  window.addEventListener("userPreferencesChanged", updateNav);

  const username = pref.get("username");
  const isHashMode = window.location.pathname.endsWith("hash.html");
  const currentPage = isHashMode
    ? window.location.hash.slice(1) || "/"
    : window.location.pathname;

  return `
        <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
            <li><a id="home" href="/" class="${currentPage === "/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
            ${username ? `<li><a id="profile" href="/profile" class="${currentPage === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>` : ""}
            <li><a id="logout" href="/login" class="text-gray-600">${username ? "로그아웃" : "로그인"}</a></li>
            </ul>
        </nav>
    `;
};

export default Nav;
