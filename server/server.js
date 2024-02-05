// Set up for server side
import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
app.disable('x-powered-by')

app.use(cors());
app.use(express.json());
const app = express();
const db = new Database("database.db");

const PORT = "2020";
app.listen(PORT, () => {
  console.log(`Server is live on port: http://localhost:${PORT}}`);
});

// Creating GET and POST so we can test database

// POST

app.post("/scoreBoard", (req, res) => {
  try {
    const username = req.body.username;
    const score = req.body.message;
    const newScore = db
      .prepare(`INSERT INTO scoreBoard (username, score) VALUES(?, ?)`)
      .run(username, score);
    res.status(200).json({ message: newScore });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//GET

app.get("/scoreBoard", (req, res) => {
  try {
    let scoreBoard = db.prepare(`SELECT * FROM scoreBoard`).all();
    res.status(200).json(scoreBoard);
  } catch (err) {
    res.status(500).json(err);
  }
});

