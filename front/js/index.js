import { postData } from "./data/postData.js";
import { showModal } from "./ui/modal.js";
import { convertFile } from "./utils/ConvertFile.js";
import { encryptWithSecretKey } from "./utils/encrypt.js";
import { validatePassword } from "./utils/validatePassword.js";

const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropzone");
const pass = document.getElementById("pass");
const submit = document.getElementById("btn-submit");
let file;
let password;
let fileEncrypt;
let fileBuffer;



pass.value = "";
window.addEventListener("dragover", (event) => {
  event.preventDefault();
})

dropZone.addEventListener("click", () => {
  fileInput.click();
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {

      showModal("El archivo es demasiado grande. Máximo 5MB");

      return;
    }
    pass.style.display = "block";
  }
})

fileInput.addEventListener("change", (event) => {
  event.preventDefault();
  file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      showModal("El archivo es demasiado grande. Máximo 5MB");
      return;
    }
    pass.style.display = "block";
  }

})

pass.addEventListener("input", async (event) => {
  password = event.target.value;
  const { valid, errors } = validatePassword(password);
  if (valid) {
    clearTimeout(pass._debounce);
    document.querySelector(".toast")?.remove();
    fileBuffer = await convertFile(file);
    submit.style.display = "block";
  } else {
    submit.style.display = "none";
    clearTimeout(pass._debounce);
    pass._debounce = setTimeout(() => {
      showModal(errors[0]);
    }, 1000);
  }
})

submit.addEventListener("click", async (event) => {
  fileEncrypt = await encryptWithSecretKey(fileBuffer, password);
  if (fileEncrypt.length > 2) {
    const safeName = file.name.replace(/[^\w.\-]/g, "_");
    const response = await postData(fileEncrypt, safeName, file.type);
    if (!response.ok) {
      showModal(`Error ${response.status}: ${response.data.msg ?? "Error al guardar"}`);
      return;
    }
  }
  window.location.reload();
})






