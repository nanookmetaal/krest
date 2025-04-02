import { Card, CardContent } from "@/components/ui/card";

type TicTacToeProps = {
  board: string[]; // Array of 'X', 'O', or ''
  onCellClick: (index: number) => void;
};

const TicTacToe: React.FC<TicTacToeProps> = ({ board, onCellClick }) => {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="grid grid-cols-3 gap-2 w-64">
        {board.map((cell, index) => (
          <Card
            key={index}
            className="w-20 h-20 flex justify-center items-center cursor-pointer hover:bg-gray-900 transition-all"
            onClick={() => onCellClick(index)}
          >
            <CardContent className="flex justify-center items-center text-2xl font-bold p-0">
              {cell}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
