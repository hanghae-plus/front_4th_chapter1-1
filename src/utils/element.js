const isAttribute = (key) => !key.startsWith("on");

const renderChild = (container) => {
  if (!container.element) return;

  if (container.firstChild) {
    container.replaceChild(container.element, container.firstChild);
  } else {
    container.appendChild(container.element);
  }
};

const createElement = (type, props, ...children) => {
  const element = document.createElement(type);

  Object.keys(props ?? {})
    .filter(isAttribute)
    .forEach((key) => {
      element.setAttribute(key, props[key]);
    });

  children.forEach((child) => {
    if (typeof child === "string" || typeof child === "number") {
      element.append(document.createTextNode(child));
    } else if (Array.isArray(child)) {
      element.append(...child);
    } else {
      element.append(child);
    }
  });

  return element;
};

const Fragment = (props, ...children) => {
  return children;
};

export { createElement, Fragment, renderChild };
