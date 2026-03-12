import { API_URL } from "../config/config.js";


export async function postData(file, name, type) {
  const response = await fetch(`${API_URL}/saveFile`, {
    method: "POST",
    body: JSON.stringify({ file, name, type }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}