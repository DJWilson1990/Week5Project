const btnStart = document.querySelector('#btn-btnStart')
const btnSpeed = document.querySelector('#btn-btnSpeed')
const pointCount = document.querySelector('#playerScore')
const btnReset = document.querySelector('#btn-reset')
const nextLvl = document.querySelector('#nextLvl')
const divs = document.querySelectorAll('.div') // taking all the class divs and saving them in the variable divs
const arraDivs = Array.from(divs) // placing the divs inside an array

let stopInterval = null // This variable is a the scope
let stopGame = null;

const data = { // data have the information of the game
  INTERVAL: 1000,
  timeout: 900,
  playerScore: 0,
  lvl: 0
}

btnStart.addEventListener('click', (e) => start())
btnReset.addEventListener('click', (e) => reset())
btnSpeed.addEventListener('click', (e) => rest())

function start() {
  console.log("starh the game,", data)
  if (stopInterval) return

  stopGame = setTimeout(() => {
    clearInterval(stopInterval);
    reset() // 
    stopInterval = null;
  }, 1 * 60 * 1000);

  stopInterval = setInterval(() => {
    const random = Math.floor(Math.random() * divs.length);
    arraDivs[random].classList.add('flash');

    setTimeout(() => {
      arraDivs[random].classList.remove('flash');
    }, data.timeout);
  }, data.INTERVAL);
}

divs.forEach((elem) => { // getting each element from the
  elem.addEventListener('click', (e) => { // creating addEventListener to playerScore all clicks
    const elem = e.target
    if (elem.classList.contains('flash')) { // creating conditional only those that have the flow style will playerScore
      data.playerScore += 1
      updateTable()
    }
  })
})

function rest() { // rest the timeout, so is gonna be more fast the game and write 
  data.timeout -= 100
  data.lvl += 1
  nextLvl.innerHTML = `Level ${data.lvl} this is the speed 0.${data.timeout}seconds`
}

function updateTable() { // updaitin the info in the HTML
  pointCount.innerHTML = data.playerScore
}

function reset() { // reset the the info of data 2. updatetable the html 3. stop the setinterval
  data.timeout = 900
  data.playerScore = 0
  data.lvl = 0
  updateTable()
  clearInterval(stopInterval)
  clearTimeout(stopGame)
  stopInterval = null
  stopGame = null
  nextLvl.innerHTML = ""
}

