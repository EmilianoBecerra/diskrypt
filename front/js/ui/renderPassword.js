import { validatePassword } from "../utils/validatePassword.js";

/*  
<template data-js="template-password">
      <input type="password" placeholder="Ingresa contraseña" data-js="password">
      <ul data-js="passIntroductions" class="passIntroductions"></ul>
      <button data-js="btn-submit" disabled></button>
    </template>
*/

export function renderPassword(ubication, textBtn, password) {
  const temp = document.querySelector('[data-js="template-password"]').content;
  const clone = temp.cloneNode(true);
  ubication.appendChild(clone);
  const ul = ubication.querySelector('[data-js="passIntroductions"]');
  const btn = ubication.querySelector('[data-js="btn-submit"]');
  btn.textContent = textBtn;
  const { valid, errors } = validatePassword(password);
  errors.map(e => {
    const li = document.createElement("li");
    li.textContent = e;
    ul.appendChild(li);
  })
}