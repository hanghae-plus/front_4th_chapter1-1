const ERROR_IMAGE_URL = "https://via.placeholder.com/40";

export const Image = ({ src, altText, className }) => {
  const handleError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = ERROR_IMAGE_URL;
  };

  const imgElement = document.createElement("img");
  imgElement.src = src || ERROR_IMAGE_URL;
  imgElement.alt = altText;
  imgElement.className = className;
  imgElement.onerror = handleError;

  return imgElement.outerHTML;
};
