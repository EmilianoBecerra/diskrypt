import Database from "better-sqlite3";
const db = new Database("./storage.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS files(
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      DATA TEXT NOT NULL,
      type TEXT NOT NULL
    )
  `);


export default db;