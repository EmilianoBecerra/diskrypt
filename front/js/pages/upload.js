import { saveFile } from "../api/filesApi.js";
import { renderPassword } from "../ui/renderPassword.js";
import { convertFile } from "../utils/ConvertFile.js";
import { encryptWithSecretKey } from "../utils/encrypt.js"
import { removePasswordError } from "../utils/removePasswordError.js";
import { validatePassword } from "../utils/validatePassword.js";
import { showModal } from "../ui/modal.js";


export function initUploadPage() {
  const container = document.getElementById("container");
  const dropZone = document.getElementById("dropzone")
  let file;
  let password = "";
  let fileBuffer;
  let fileEncrypt;

  window.addEventListener("dragover", (event) => {
    event.preventDefault();
  })


  document.addEventListener("change", (event) => {
    if (event.target.id === "fileInput") {
      event.preventDefault();
      file = event.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          showModal("El archivo es demasiado grande. Máximo 5MB");
          return;
        }
        dropZone.textContent = file.name;
        renderPassword(container, "Guardar Archivo", password);
      }
    }
  })

  document.addEventListener("drop", (event) => {
    if (event.target.id === "dropzone") {
      event.preventDefault();
      file = event.dataTransfer.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          showModal("El archivo es demasiado grande. Máximo 5MB");
          return;
        }
        renderPassword(container, "Guardar Archivo", password);
      }
    }
  })

  document.addEventListener("input", async (event) => {
    if (event.target.dataset.js === "password") {
      password = event.target.value;
      const { valid, errors } = validatePassword(password);
      const ul = container.querySelector('[data-js="passIntroductions"]');
      removePasswordError(errors, ul);
      if (valid) {
        fileBuffer = await convertFile(file);
        const btnSubmit = container.querySelector('[data-js="btn-submit"]');
        btnSubmit.disabled = false;
      }
    }
  })

  document.addEventListener("click", async (event) => {
    if (event.target.id === "dropzone" || event.target.id === "msg-dropzone") {
      const inputFile = document.getElementById("fileInput")
      inputFile.click()
    }

    if (event.target.dataset.js === "btn-submit") {
      fileEncrypt = await encryptWithSecretKey(fileBuffer, password);
      if (fileEncrypt.length > 2) {
        const safeName = file.name.replace(/[^\w.\-]/g, "_");
        const response = await saveFile(fileEncrypt, safeName, file.type);
        if (!response.ok) {
          showModal(`Error ${response.status}: ${response.data.msg ?? "Error al guardar"}`);
          return;
        }
        location.reload();
      }
    }
  })
}