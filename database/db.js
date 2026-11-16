import Database from "better-sqlite3";

const db = new Database("./database/jswebbproject.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        SKU TEXT NOT NULL,
        description NOT NULL
    )
`);

export default db;
