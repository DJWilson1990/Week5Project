// const baseURL = `http://localhost:2020`;
const baseURL = `https://teamproject-clickgame-server.onrender.com`;

/////////////////////////////////////////////FOR SCORE BOARD////////////////////////////////////////////////////////

const leaderBoard = document.getElementById(`leader-board`);

const topScores = await getScoreBoard(5);
// setting scoreboard to show 5 results
for (let index = 0; index < topScores.length; index++) {
  let tableRow = document.createElement(`tr`);
  let tableName = document.createElement(`td`);
  let tableScore = document.createElement(`td`);
  let tableLevel = document.createElement(`td`);
  tableName.textContent = topScores[index].username;
  tableScore.textContent = topScores[index].score;
  tableLevel.textContent = topScores[index].level;
  tableRow.append(tableName);
  tableRow.append(tableScore);
  tableRow.append(tableLevel);
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
  const response = await fetch(`${baseURL}/messageBoard`, {
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

async function getMessageList() {
  const response = await fetch(`${baseURL}/messageBoard`);
  let result = await response.json();
  console.log(result);
  return result;
}

async function displayMessageList() {
  let messages = await getMessageList();
  messageList.innerHTML = "";
  messages.forEach((message) => {
    //////////////A lot of creating elements/innerText/textContent////////////////
    let messageLi = document.createElement("li");
    let messageDiv = document.createElement("div");
    let usernameDelDiv = document.createElement("div");
    let messageUserName = document.createElement("p");
    let messageText = document.createElement("p");
    let deleteBtn = document.createElement("button");
    usernameDelDiv.className = `username-delete-div`;
    messageUserName.className = `username`;
    messageUserName.textContent = `${message.username}`;
    messageText.className = `message-text`;
    messageText.textContent = `${message.message}`;
    deleteBtn.id = message.id;
    deleteBtn.textContent = "X";

    ////////////////////////////For delete button//////////////////////
    usernameDelDiv.appendChild(messageUserName);
    usernameDelDiv.appendChild(deleteBtn);
    messageDiv.appendChild(usernameDelDiv);
    messageDiv.appendChild(messageText);
    messageLi.appendChild(messageDiv);
    messageList.appendChild(messageLi);
  });
}
displayMessageList();

///////////////////Event Listener for delete button///////////////////////

messageList.addEventListener("click", async (event) => {
  event.preventDefault();
  await handleDelete(event.target.id);
  displayMessageList();
});

////////////////async function for delete message////////////////////

async function handleDelete(id) {
  const result = await fetch(`${baseURL}/messageBoard/${id}`, {
    method: "DELETE",
  });
  console.log(result);
}
