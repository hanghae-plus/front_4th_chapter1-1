export const createRenderer = ({ render }) => {
  return {
    rerender: () => {
      render();
    },
  };
};
