export const NotFound = () => {
  const container = document.createElement("div");

  container.innerHTML = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <p class="text-5xl font-bold text-center text-gray-600 mb-8">404</p>
        <p class="text-sm text-center text-gray-600 mb-2">페이지를 찾을 수 없습니다</p>
        <p class="text-sm text-center text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        <a href="/" class="w-full bg-blue-600 text-white p-2 rounded font-bold text-center block">홈으로 돌아가기</a>
      </div>
    </main>
  `;

  return container;
};
