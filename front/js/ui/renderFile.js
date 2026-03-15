import { renderPassword } from "./renderPassword.js";


export function renderFile(ul, pass, file) {
  const li = document.createElement("li");
  li.classList.add("li-file");
  const p = document.createElement("p");
  p.textContent = file.name;
  li.appendChild(p);
  renderPassword(li, "Descargar Archivo", pass);
  const btn = li.querySelector('[data-js="btn-submit"]');
  btn.id = file.id;
  ul.appendChild(li);
}