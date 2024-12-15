export const Footer = () => {
  const user = localStorage.getItem("user");

  if (!user) return "";

  return `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `;
};
