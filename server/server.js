// Set up for server side

import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
app.use(cors());
app.use(express.json());
const db = new Database("database.db");

const PORT = "2020";
app.listen(PORT, () => {
  console.log(`Server is live on port: ${PORT}`);
});

//////////////////////////////////////////////SCOREBOARD////////////////////////////////////////////////////////////

// Creating GET and POST so we can test database
// POST
// POST request: username and score data to be sent to database. username and score data taken from game play

app.post("/scoreBoard", (req, res) => {
  try {
    const username = req.body.username;
    const score = req.body.score;
    const newScore = db
      .prepare(`INSERT INTO scoreBoard (username, score) VALUES(?, ?)`)
      .run(username, score);
    res.status(200).json({ message: newScore });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//GET
// GET request: username and score to be taken from database - to be displayed on leader board
// setting it up so scoreboard will display top scored in order from highest to lowest. have set it to show 10 score in scoreBoard.js. if the number of returned scores is not defined. 50 results will show on leader board.

app.get("/scoreBoard", (req, res) => {
  let numberToReturn = req.query.count;
  if (numberToReturn === undefined) {
    numberToReturn = 50;
  }
  try {
    let scoreBoard = db
      .prepare(`SELECT * FROM scoreBoard ORDER BY score DESC LIMIT ?`)
      .all(numberToReturn);
    res.status(200).json(scoreBoard);
  } catch (err) {
    res.status(500).json(err);
  }
});

/////////////////////////////////////////////////MESSAGE BOARD//////////////////////////////////////////////////////

// POST

app.post("/messageBoard", (req, res) => {
  try {
    const username = req.body.username;
    const message = req.body.message;
    const newMessage = db
      .prepare(`INSERT INTO messageBoard (username, message) VALUES(?, ?)`)
      .run(username, message);
    res.status(200).json({ message: newMessage });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET

app.get("/messageBoard", (req, res) => {
  try {
    let messageBoard = db.prepare(`SELECT * FROM messageBoard`).all();
    res.status(200).json(messageBoard);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

app.delete("/messageBoard/:id", (req, res) => {
  try {
    let id = req.params.id;
    let deletedMessage = db
      .prepare(`DELETE FROM messageBoard WHERE id = ?`)
      .run(id);
    res.status(200).json({ recordDeleted: deletedMessage });
  } catch (err) {
    res.sendStatus(500).json({ error: err.message });
  }
});
