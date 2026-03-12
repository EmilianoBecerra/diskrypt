import { API_URL } from "../config/config.js";

const allFile = document.getElementById("allInfo");

export async function getAllData() {
  const url = `${API_URL}/files`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

async function renderFiles() {
  try {
    const files = await getAllData();
    if (!files || files.length === 0) {
      allFile.classList.remove("divAllFiles");
      allFile.classList.add("without-files")
      const p = document.createElement("p");
      p.textContent = "No hay archivos guardados.";
      allFile.appendChild(p);
    } else {
      allFile.classList.remove("without-files");
      allFile.textContent = "";
      allFile.classList.add("divAllFiles");
      const ul = document.createElement("ul");
      ul.classList.add("ulFiles")
      files.forEach(f => {
        const p = document.createElement("p");
        const li = document.createElement("li");
        const button = document.createElement("button");
        const input = document.createElement("input");
        button.textContent = "Descargar";
        button.classList.add("btnDownload");
        button.id = f.id;
        button.classList.add("btn-disabled");
        input.classList.add("inputPass");
        input.type = "password"
        input.placeholder = "Ingresar contraseña";
        li.classList.add("li-file");
        p.textContent = `Nombre: ${f.name}`;
        li.appendChild(p);
        li.appendChild(input);
        li.appendChild(button);
        ul.appendChild(li);
      });
      allFile.appendChild(ul);
    }
  } catch (error) {
    console.error("Error al mostrar los archivos");
  }
}

renderFiles();