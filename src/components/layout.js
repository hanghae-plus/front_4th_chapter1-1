import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = (
  children,
) => `<div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <div id="root" class="mx-auto max-w-screen-lg">
            ${Header()}
            ${children}
            ${Footer()}
          </div>
        </div>
      </div>`;
