import { randomUUID } from "node:crypto";
import db from "../config/db.js";

export function insertFile(filename, data, type) {
  const id = randomUUID();
  db.prepare("INSERT INTO files (id, filename, data, type) VALUES (?, ?, ?, ?)").run(id, filename, data, type);
  return id;
}

export function getAllFile() {
  return db.prepare("SELECT * FROM files").all();
}

export function getByIdFile(id) {
  return db.prepare("SELECT * FROM files WHERE id = ?").get(id);
}

export function deleteAll() {
  db.prepare("DELETE FROM files").run();
}

export function deleteOneFile(id) {
  return db.prepare("DELETE FROM files WHERE id = ?").run(id);
}