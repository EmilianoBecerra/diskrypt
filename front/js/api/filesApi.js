import { API_URL } from "../config/config.js";

export async function getFileID(id) {
  try {
    const response = await fetch(`${API_URL}/files/${id}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error al obtener el archivo")
  }
}

export async function getAllFiles() {
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

export async function saveFile(filename, data, salt, iv, type) {
  const response = await fetch(`${API_URL}/saveFile`, {
    method: "POST",
    body: JSON.stringify({ filename, data, salt, iv, type }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const d_ = await response.json();
  return { ok: response.ok, status: d_ };
}

export async function deleteFile(id) {
  await fetch(`${API_URL}/file/${id}`, { method: "DELETE" });
}