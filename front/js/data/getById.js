export async function getById(id) {
  try {
    const response = await fetch(`http://localhost:3000/files/${id}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error al obtener el archivo")
  }
}