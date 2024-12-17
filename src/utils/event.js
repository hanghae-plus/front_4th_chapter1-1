// 전역 네비게이션 링크 클릭 처리
export const navClick = (router) => {
  const navbar = document.querySelector("nav");
  if (navbar) {
    navbar.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.stopPropagation();
        e.preventDefault(); // 기본 링크 클릭 동작을 막음
        const path = e.target.getAttribute("href");
        router.navigateTo(path);
      }
    });
  }
};
