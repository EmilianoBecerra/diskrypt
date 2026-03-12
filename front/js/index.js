import { postData } from "./data/postData.js";
import { convertFile } from "./utils/ConvertFile.js";
import { encryptWithSecretKey } from "./utils/encrypt.js";

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

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo es demasiado grande. Máximo 5MB.");
      return;
    }
    pass.style.display = "block";
  }
})

pass.addEventListener("input", async (event) => {
  password = event.target.value;

  if (password && password.length > 8) {
    fileBuffer = await convertFile(file);
    submit.style.display = "block";
  }
})

submit.addEventListener("click", async (event) => {
  fileEncrypt = await encryptWithSecretKey(fileBuffer, password);
  if (fileEncrypt.length > 2) {
    const response = await postData(fileEncrypt, file.name, file.type);
    if (!response.ok) {
      alert(`Error ${response.status}: ${response.data.msg ?? "Error al guardar"}`);
      return;
    }
  }
  window.location.reload();
})






