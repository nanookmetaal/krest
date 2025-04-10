import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import TicTacToe from "./components/game-board";

const emptyBoard = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMsg, setGameOverMsg] = useState('');

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setGameOver(true);
      setGameOverMsg(`${winner} wins!`);
    } else if (board.every((cell) => cell !== "")) {
      setGameOver(true);
      setGameOverMsg(`It's a draw!`);
    }
  }, [board]);

  const handleCellClick = (index: number) => {
    if (gameOver || board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = "x";
    setBoard(newBoard);

    setTimeout(() => {
      const postMoveWinner = checkWinner(newBoard);
      if (!postMoveWinner && newBoard.some((cell) => cell === "")) {
        const emptyIndices = newBoard.map((val, i) => (val === "" ? i : null)).filter((i) => i !== null) as number[];

        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        const opponentBoard = [...newBoard];
        opponentBoard[randomIndex] = "o";
        setBoard(opponentBoard);
      }
    }, 300);
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold my-4">krest.exe</h1>

          <TicTacToe board={board} onCellClick={handleCellClick} />

          { gameOver === true &&
              <p>{gameOverMsg}</p>
          }

          <Button
            size="lg"
            className="mt-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setBoard(emptyBoard);
              setGameOver(false);
            }}
          >
            Reset
          </Button>
        </div>
      </ThemeProvider>
    </>
  );
}

function checkWinner(board: string[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

export default App;
