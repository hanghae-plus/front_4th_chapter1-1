import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout = (component) => {
  return `
      <div>
        ${Header()}
        ${component()}  
        ${Footer()}
      </div>
    `;
};

export default DefaultLayout;
