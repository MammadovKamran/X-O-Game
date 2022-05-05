// !>>>>>>>>>>>>>>>>>>>>>DOM ELEMENTS<<<<<<<<<<<<<<<<<<<<<<<<<<<

const game_container = document.getElementsByClassName("game--container");
const game_cells = document.querySelectorAll(".cell");
const Body = document.querySelector("section");
const RestartBtn = document.querySelector(".game-restart");

// ?>>>>>>>>>>>>>>>>>>>>>WINNING COMBINATIONS AND X,O<<<<<<<<<<<<<<<<<<<<<<<<<<<

let currentPlayer = "";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let indexs_X = [];
let indexs_0 = [];

// !>>>>>>>>>>>>>>>>>>>>> EVENTS <<<<<<<<<<<<<<<<<<<<<<<<<<<

eventListener();

function eventListener() {
  game_cells.forEach((cell) => {
    cell.addEventListener("click", addX_0);
  });
  RestartBtn.addEventListener("click", RestartGame);
}

// !>>>>>>>>>>>>>>>>>>>>>ADD UI X AND O<<<<<<<<<<<<<<<<<<<<<<<<<<<

function addX_0(e) {
  let idCells = this.id;

  if (this.lastElementChild.classList.length === 0) {
    if (currentPlayer === "") {
      currentPlayer = "x";
      this.firstElementChild.classList.add("x");
      indexs_X.push(idCells);
      console.log(indexs_X);
    } else {
      this.firstElementChild.classList.add("o");
      currentPlayer = "0";
      indexs_0.push(idCells);
      console.log(indexs_0);
      currentPlayer = "";
    }
  }
  control_Winning_positions(indexs_X);
  console.log(this.firstElementChild.className);
  e.preventDefault();
}

// !>>>>>>>>>>>>>>>>>>>>>WINNING COMNINATIN FUNCTION<<<<<<<<<<<<<<<<<<<<<<<<<<<

function control_Winning_positions(indexs_X) {
  winningCombinations.forEach((combinition) => {
    let counterX = 0;
    let counterO = 0;

    combinition.forEach((combinition_element) => {
      indexs_X.forEach((X_index_number) => {
        if (X_index_number == combinition_element) {
          counterX++;
          if (counterX == 3) {
            displayMessage("x", "Blue Win");
          }
          console.log(counterX);
        }
      });
      indexs_0.forEach((O_index_number) => {
        if (O_index_number == combinition_element) {
          counterO++;
          if (counterO === 3) {
            displayMessage("o", "Red Win");
          }
        }
      });
    });
  });
}

// !>>>>>>>>>>>>>>>>>>>>>DISPLAY MESSAGE<<<<<<<<<<<<<<<<<<<<<<<<<<<

function displayMessage(type, content) {
  let div = document.querySelector(".overlay");
  div.classList.add(`${type}-win`);
  div.textContent = content;
  setTimeout(() => {
    div.textContent = "";
    div.classList.remove(`${type}-win`);
  }, 1000);
}

// !>>>>>>>>>>>>>>>>>>>>>RESTART GAME<<<<<<<<<<<<<<<<<<<<<<<<<<<

function RestartGame(e) {
  location.reload();
  e.preventDefault();
}
