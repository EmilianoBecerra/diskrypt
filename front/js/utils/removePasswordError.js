
export function removePasswordError(errors, container) {
  container.textContent = "";
  errors.map(e => {
    const li = document.createElement("li");
    li.textContent = e;
    container.appendChild(li);
  })
}