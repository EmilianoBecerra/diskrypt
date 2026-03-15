import Database from "better-sqlite3";
const urlDB =  process.env.DB_PATH;
const db = new Database(urlDB);

db.exec(`
    CREATE TABLE IF NOT EXISTS files(
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      data TEXT NOT NULL,
      type TEXT NOT NULL
    )
  `)


export default db;