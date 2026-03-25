import Database from "better-sqlite3";
const urlDB =  process.env.DB_PATH;
const db = new Database(urlDB);

db.exec(`
    CREATE TABLE IF NOT EXISTS files(
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      data BLOB NOT NULL,
      salt BLOB NOT NULL,
      iv BLOB NOT NULL
      typeFile TEXT NOT NULL,
    )
  `)


export default db;