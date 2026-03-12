

export async function postData(file, name, type) {
  const response = await fetch("http://localhost:3000/saveFile", {
    method: "POST",
    body: JSON.stringify({ file, name, type }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}