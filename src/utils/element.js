const isEvent = (key) => key.startsWith("on");
const isAttribute = (key) => !key.startsWith("on");

const createElement = (type, props, ...children) => {
  const element = document.createElement(type);

  Object.keys(props ?? {})
    .filter(isEvent)
    .forEach((key) => {
      const eventName = key.toLowerCase().substring(2);
      element.addEventListener(eventName, props[key]);
    });

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

export { createElement, Fragment };
