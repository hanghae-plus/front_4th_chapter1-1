export const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};

// storage
export const getUserFromStorage = () =>
  JSON.parse(localStorage.getItem("user"));

export const saveUserToStorage = (user) =>
  localStorage.setItem("user", JSON.stringify(user));

export const clearUserFromStorage = () => localStorage.removeItem("user");

// form
export const setFormValues = (form, values) => {
  for (const [key, value] of Object.entries(values)) {
    const input = form.querySelector(`#${key}`);
    if (input) input.value = value;
  }
};
export const getFormValues = (form) => {
  const values = {};
  form.querySelectorAll("input, textarea").forEach((input) => {
    values[input.id] = input.value;
  });
  return values;
};
