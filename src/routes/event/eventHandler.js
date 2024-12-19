window.addEventListener("popstate", (event) => {
  event.preventDefault();
  console.log(event);
});
