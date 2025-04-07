import { useState } from "react";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import TicTacToe from "./components/game-board";

const emptyBoard = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [board, setBoard] = useState(emptyBoard);

  return (
    <>
      <ModeToggle />

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold my-4">krest.exe</h1>

          <TicTacToe
            board={board}
            onCellClick={(index: number) => {
              updateGrid(index, "x", (newBoard) => {
                checkGameOver(newBoard);
              });

              opponentMove(board);

              console.debug(`Move: ${index}`);
            }}
          />

          <Button size="lg" className="mt-4" onClick={() => setBoard(emptyBoard)}>
            Reset
          </Button>
        </div>
      </ThemeProvider>
    </>
  );

  function updateGrid(index: number, val: string, callback?: (newBoard: string[]) => void) {
    setBoard((prevBoard) => {
      if (prevBoard[index] !== "") return prevBoard;

      const newBoard = [...prevBoard];
      newBoard[index] = val;

      if (callback) callback(newBoard);

      return newBoard;
    });
  }

  function checkGameOver(currentBoard: string[]) {
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
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        alert(`${currentBoard[a]} wins!`);
        return;
      }
    }

    if (currentBoard.every((cell) => cell !== "")) {
      alert("It's a draw!");
    }
  }

  function opponentMove(currentBoard: string[]) {
    const emptyIndices = currentBoard.map((val, i) => (val === "" ? i : null)).filter((i) => i !== null) as number[];

    if (emptyIndices.length === 0) return;

    console.log("TESTES");

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    updateGrid(randomIndex, "o", (newBoard) => {
      checkGameOver(newBoard);
    });
  }
}

export default App;
