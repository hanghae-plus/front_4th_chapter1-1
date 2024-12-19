export const PlainLayout = (content) => {
  return `
    <main id="root" class="bg-gray-100 flex items-center justify-center min-h-screen">
      ${content} 
    </main>
  `;
};
