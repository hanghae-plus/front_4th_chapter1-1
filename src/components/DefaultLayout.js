import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout = (component) => `
    <div class="max-w-md w-full">
        ${Header()}
        ${component}
        ${Footer()}
    </div>
`;
export default DefaultLayout;
