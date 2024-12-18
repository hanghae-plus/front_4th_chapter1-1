import ComponentBinding from "./ComponentBinding";
import PageBinding from "./PageBinding";

const createBindings = ($target) => {
  const componentBinding = new ComponentBinding($target);
  const pageBinding = new PageBinding($target);

  return {
    component: componentBinding,
    page: pageBinding,
  };
};

export default createBindings;
