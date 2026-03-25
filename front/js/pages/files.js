import { deleteFile, getAllFiles, getFileID } from "../api/filesApi.js";
import { renderFile } from "../ui/renderFile.js";
import { decryptFile } from "../utils/decrypt.js";
import { removePasswordError } from "../utils/removePasswordError.js";
import { validatePassword } from "../utils/validatePassword.js";
import { showModal } from "../ui/modal.js"


export async function initFilesPage() {
  const main = document.getElementById("main-files");
  let files;
  let pass = "";
  const template = document.getElementById("template-files");
  const nodes = template.content.cloneNode(true);
  //si el array que viene del backend está vacío. ↓
  try {
    files = await getAllFiles();
    console.log(files);
    if (!files) throw new Error("Error al obtener archivos");
  } catch (error) {
    console.error(error);
  }
  const text = nodes.querySelector("#msg-nofiles");

  if (files === undefined) {
    text.textContent = "Error en el servidor.";
    main.appendChild(text);
    return;
  }

  if (files.length === 0) {
    text.textContent = "No hay archivos guardados";
    main.appendChild(text);
    return;
  }

  //Si los archivos vienen con un array mayor a 0 desde el backend. ↓
  main.classList.add("main-Files");
  const filesStructure = nodes.querySelector("#allFiles");
  const ul = document.createElement("ul");
  ul.classList.add("ulFiles");
  files.map(f => {
    //Función que se encarga de renderizar los archivos dentro del ul;
    renderFile(ul, pass, f);
  })
  filesStructure.appendChild(ul);
  main.appendChild(filesStructure);

  // Delegación de eventos ↓
  main.addEventListener("input", (event) => {
    if (event.target.dataset.js === "password") {
      pass = event.target.value;
      const { valid, errors } = validatePassword(pass);
      const container = event.target.closest('.li-file').querySelector('[data-js="passIntroductions"]');
      removePasswordError(errors, container);
      if (valid) {
        const btn = event.target.closest(".li-file").querySelector('[data-js="btn-submit"]');
        btn.disabled = false;
      }
    }
  })

  main.addEventListener("click", async (event) => {
    if (event.target.dataset.js === 'btn-submit' && event.target.id !== "") {
      try {
        const id = event.target.id;
        const { cipherText, salt, iv } = await getFileID(id);
        const decrypt = await decryptFile(cipherText, salt, iv, password);
        deleteFile(id);
        location.reload();
      } catch (error) {
        showModal("Contraseña incorrecta");
      }
    }
  })






}