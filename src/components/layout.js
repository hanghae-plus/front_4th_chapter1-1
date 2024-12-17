import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = (children, showHeaderAndFooter = true) =>
  showHeaderAndFooter
    ? `<div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${Header()}
          <main class="p-4">${children}</main>
          ${Footer()}
        </div>
      </div>`
    : children;
