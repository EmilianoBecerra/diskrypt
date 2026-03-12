export async function convertFile(file) {
  return await file.arrayBuffer();
}