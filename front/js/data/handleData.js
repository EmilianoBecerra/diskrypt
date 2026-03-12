import { decryptFile } from "../utils/decrypt.js";
import { getById } from "./getById.js";

const info = document.getElementById("allInfo");

info.addEventListener("input", (event) => {
  if (!event.target.classList.contains("inputPass")) return;
  const input = event.target;
  const button = input.nextElementSibling;
  if (input.value.length >= 8) {
    button.classList.remove("btn-disabled");
  } else {
    button.classList.add("btn-disabled");
  }
});

info.addEventListener("click", async (event) => {
  try {
    if (!event.target.classList.contains("btnDownload")) return;
    const button = event.target;
    const input = button.previousElementSibling;
    if (button.classList.contains("btn-disabled")) return;
    const file = await getById(button.id);
    if (!file) { console.error("Archivo no disponible"); return; }
    const newFile = decryptFile(file.DATA, file.type, input.value, file.filename);
  } catch (error) {
    console.error("Error al obtener archivo");
  }
})


