const baseURL = `http://localhost:2020`;

/////////////////////////////////////////////FOR SCORE BOARD////////////////////////////////////////////////////////

const leaderBoard = document.getElementById(`leader-board`);

const topScores = await getScoreBoard(5);
// setting scoreboard to show 10 results
for (let index = 0; index < topScores.length; index++) {
  let tableRow = document.createElement(`tr`);
  let tableName = document.createElement(`td`);
  let tableScore = document.createElement(`td`);
  tableName.textContent = topScores[index].username;
  tableScore.textContent = topScores[index].score;
  tableRow.append(tableName);
  tableRow.append(tableScore);
  leaderBoard.append(tableRow);
}

async function getScoreBoard(count) {
  const response = await fetch(`${baseURL}/scoreBoard?count=${count}`);
  let result = await response.json();
  console.log(result);
  return result;
}

//////////////////////////////////////////FOR MESSAGE BOARD/////////////////////////////////////////////////////////

const messageForm = document.getElementById(`message-form`);
const submitButton = document.getElementById(`submit-button`);
const messageList = document.getElementById(`message-list`);

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const messageData = new FormData(messageForm);
  const messageContent = Object.fromEntries(messageData);
  const response = await fetch(`${baseURL}/scoreBoard`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(messageContent),
  });
  if (response.status === 200) {
    displayMessageList();
  } else {
    console.log(`Message failed to send`);
  }
});

displayMessageList();
