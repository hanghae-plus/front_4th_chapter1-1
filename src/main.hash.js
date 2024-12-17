import "./pages/main-page";
import "./pages/error-page";
import "./pages/login-page";
import "./pages/profile-page";
import "./components/header-component";
import "./components/footer-component";
import "./components/nav-component";
import "./components/post-card-component";
import "./components/post-form-component";
import "./components/profile-form-component";
import "./components/login-form-component";
import "./main-app";

window.isHash = true;
document.querySelector("#root").innerHTML = "<main-app></main-app>";
