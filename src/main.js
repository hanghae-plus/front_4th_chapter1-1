import { TestAPage } from "./pages/TestAPage";
import { TestBPage } from "./pages/TestBPage";
import { Router } from "./Router";

document.body.innerHTML = `
  ${Router.pathname === "/test-a" ? TestAPage() : ""}
  ${Router.pathname === "/test-b" ? TestBPage() : ""}
`;
