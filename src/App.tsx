import { useState } from "react";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import TicTacToe from "./components/game-board";

function App() {
  const [board, setBoard] = useState(['','','','','','','','','']);

  return (
    <>
      <ModeToggle/>

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col items-center">
          <h1>krest.exe</h1>

          <TicTacToe board={board} onCellClick={function (): void {
            throw new Error("Function not implemented.");
          } }>
            
          </TicTacToe>

          <Button size={"lg"} onClick={() => setBoard(['','','','','','','','',''])}>
            Reset
          </Button>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
