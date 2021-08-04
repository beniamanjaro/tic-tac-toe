let cells = document.querySelectorAll(".cell");
let restartButton = document.querySelector(".restartButton");
let gameState = document.querySelector(".game-state");
let restart = document.querySelector(".restart-button");

const gameFunctions = (() => {
  let board = new Array(9).fill(null);
  let player = "X";
  gameState.innerHTML = `It's ${player}'s turn`;
  let isInProgress = () => {
    return !findWinningCombination() && board.includes(null);
  };
  let nextTurn = () => {
    if (findWinningCombination()) {
      return (gameState.innerHTML = `${player} Won, play again`);
    }
    player = player === "X" ? "O" : "X";
  };

  let makeMove = (i) => {
    if (!isInProgress()) {
      return;
    }

    if (board[i]) {
      return;
    }
    board[i] = player;
    nextTurn();
    manageGameState();
  };

  let manageGameState = () => {
    if (findWinningCombination()) {
      if (board[findWinningCombination()[0]] === "X") {
        for (let i = 0; i < findWinningCombination().length; i++) {
          cells[findWinningCombination()[i]].classList.add("win");
        }
        return (gameState.innerHTML = `X Won, play again`);
      } else {
        for (let i = 0; i < findWinningCombination().length; i++) {
          cells[findWinningCombination()[i]].classList.add("win");
        }
        return (gameState.innerHTML = `O Won, play again`);
      }
    }
    if (!board.includes(null)) {
      return (gameState.innerHTML = `DRAW`);
    }
    return (gameState.innerHTML = `It's ${player}'s turn`);
  };

  let findWinningCombination = () => {
    winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return combination;
      }
    }
    return null;
  };

  let handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("cell-index"));
    if (
      cells[clickedCellIndex].classList.contains("O") ||
      cells[clickedCellIndex].classList.contains("X")
    ) {
      makeMove(clickedCellIndex);
    } else if (isInProgress()) {
      clickedCell.innerHTML = player;
      clickedCell.classList.add(player);
    }
    makeMove(clickedCellIndex);
  };

  let restart = () => {
    board = new Array(9).fill(null);
    player = "X";
    gameState.innerHTML = `It's ${player}'s turn`;

    for (let i = 0; i < board.length; i++) {
      cells[i].classList.remove("X");
      cells[i].classList.remove("O");
      cells[i].classList.remove("win");
      cells[i].innerHTML = "";
    }
  };

  return { handleCellClick, restart };
})();

restart.addEventListener("click", gameFunctions.restart);

cells.forEach((cell) => {
  cell.addEventListener("click", gameFunctions.handleCellClick);
});
