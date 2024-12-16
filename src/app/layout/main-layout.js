import { Footer } from "../../widgets/footer";
import { Header } from "../../widgets/header";
import { Navigation } from "../../widgets/navigation";

function MainLayout(children) {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Navigation()}
        ${children}
        ${Footer()}
      </div>
    </div>
  `;
}

export { MainLayout };
