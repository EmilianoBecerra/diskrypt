import { API_URL } from "../config/config.js";

export async function getById(id) {
  try {
    const response = await fetch(`${API_URL}/files/${id}`);
    if(!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error al obtener el archivo")
  }
}