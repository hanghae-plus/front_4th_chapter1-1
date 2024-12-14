import { TestAPage } from "./pages/TestAPage";
import { TestBPage } from "./pages/TestBPage";
import { SPARouter } from "./SPARouter";

function renderApp() {
  document.body.innerHTML = `
    ${SPARouter.pathname === "/test-a" || SPARouter.pathname === "/" ? TestAPage() : ""}
    ${SPARouter.pathname === "/test-b" ? TestBPage() : ""}
  `;

  SPARouter.init({ callback: renderApp });
}

renderApp();
