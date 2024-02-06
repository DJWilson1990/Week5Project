// setting up consts
const playButton = document.getElementsByClassName("start-game-button");
const playerScore = document.getElementsByClassName("player-score");
const playerName = document.getElementsByClassName("player-username");
const playerInfo = document.getElementsByClassName("username-entry");
const submitUserButton = document.getElementsByClassName(
  "submit-username-button"
);
const lights = document.getElementsByClassName("light");

// event listeners - need event listener for the lights. specifically targeting the 'flashing' light to increment score

// hopefully this will send the username and score data to database.
submitUserButton.addEventListener("submit", async (event) => {
  event.preventDefault();
  const scoreBoardData = new FormData(playerInfo);
  const scoreBoardInfo = object.fromEntries(playerInfo);
  const response = await fetch(`${baseURL}/scoreBoard`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(scoreBoardInfo),
  });
  if (response.status === 200) {
    displayScore(); //this function doesnt exist yet!
  } else {
    console.log("Failed to add score");
  }
});

// async function to get scores from database - will be shown in leader board
async function getScore() {
  const response = await fetch(`${baseURL}/scoreBoard`);
  let result = await response.json();
  console.log(result);
  return result;
}

// async function to show scores in leader board
async function displayScore() {
  let playerResults = await playerInfo();
}
