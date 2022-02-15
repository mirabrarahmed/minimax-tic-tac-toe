"use strict";

const GameBoard = (gameBoard) => {
    const container = document.querySelector(".container")
    for(let i=0; i<gameBoard.length; i++){

        let div = document.createElement("div")
        div.setAttribute("class", `board-row-${i}`)
        container.append(div)
        for(let j=0; j<gameBoard[i].length; j++){
            let boardRow = document.querySelector(`.board-row-${i}`)
            let div = document.createElement("div")
            div.setAttribute("class", `board-data`)
            div.textContent = gameBoard[i][j]
            boardRow.append(div)
        }

    }

}

function equals(x,y,z){
    return x == y && y == z && x != ""
}

const GameWinner = () => {
    let winner = null;

    // horizontal
    for (let i = 0; i < gameBoard.length; i++) {
      if (equals(gameBoard[i][0], gameBoard[i][1], gameBoard[i][2])) {
        winner = gameBoard[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < gameBoard.length; i++) {
      if (equals(gameBoard[0][i], gameBoard[1][i], gameBoard[2][i])) {
        winner = gameBoard[0][i];
      }
    }
  
    // Diagonal
    if (equals (gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])) {
      winner = gameBoard[0][0];
    }
    if (equals (gameBoard[2][0], gameBoard[1][1],  gameBoard[0][2])) {
      winner = gameBoard[2][0];
    }
  
    let openSpots = 0;
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j] == '') {
          openSpots++;
        }
      }
    }
  
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      // console.log(winner)
      return winner;
    }
}

function aiMove() {
  // AI to make its turn
  let bestScore = Infinity;
  let move;
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      // Is the spot available?
      if (gameBoard[i][j] == '') {
        gameBoard[i][j] = ai;
        let score = minimax(gameBoard, 0, false);
        gameBoard[i][j] = '';
        if (score < bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  gameBoard[move.i][move.j] = ai;
  document.getElementById(`data-${move.i}-${move.j}`).textContent = currentPlayer
  currentPlayer = human;
  // return move
}

function minimax(board, depth, isMaximizing) {
  // console.log(board)
  let result = GameWinner();
  if (result !== null) {
    // console.log(scores[result])
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          if(score > bestScore){
            bestScore = score
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          if(score < bestScore){
            bestScore = score
          }
        }
      }
    }
    return bestScore;
  }
}


const gameBoard = [["", "" , ""], ["", "" , ""], ["", "" , ""]]
const human = "X"
const ai = "O"
let currentPlayer = human

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

const container = document.querySelector(".container")
for(let i=0; i<gameBoard.length; i++){
  for(let j=0; j<gameBoard[i].length; j++){
      let div = document.createElement("div")
      div.setAttribute("style", "font-size: 50px;")
      div.setAttribute("id", `data-${i}-${j}`)
      div.textContent = gameBoard[i][j]
      container.append(div)
}    
}

const divs = [...document.querySelectorAll(`[id*="data"]`)];
console.log(divs)
divs.forEach((rowBox) => {
  
  rowBox.addEventListener('click', () => {
      // Player(rowBox)
      if(currentPlayer = human){
        console.log(rowBox.id)
        for(let i=0; i<gameBoard.length; i++){
          for(let j=0; j<gameBoard[i].length; j++){
            if(gameBoard[i][j] === ""){
              let idName = rowBox.id.split("-")
              let i = idName[1]
              let j = idName[2]
              gameBoard[i][j] = currentPlayer
              document.getElementById(`data-${i}-${j}`).textContent = currentPlayer
            }
          }
        }
        currentPlayer = ai
        let move = aiMove()
        console.log(move)
        console.log(gameBoard)
        console.log("PRESSED")
        console.log(currentPlayer)
      }
      }, {once:true}
      )
      
  }
)   




