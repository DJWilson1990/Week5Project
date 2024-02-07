// Setup

import Database from "better-sqlite3";
const db = new Database("database.db");

// Creating table for database

db.exec(`CREATE TABLE IF NOT EXISTS scoreBoard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    score INTEGER    
)`);

db.exec(`CREATE TABLE IF NOT EXISTS messageBoard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT
)`);
