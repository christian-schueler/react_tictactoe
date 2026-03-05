import { useState, type JSX } from "react";
import "./Board.css";

export default function Board() {
  const [activePlayer, setActivePlayer] = useState((): string => "X");

  function setActivePlayerNext(): void {
    setActivePlayer((prev): string => (prev === "X" ? "O" : "X"));
  }

  function cellClicked(e: React.MouseEvent<HTMLDivElement>): void {
    const cell = e.target as HTMLDivElement;
    if (cell.textContent === "") {
      cell.textContent = activePlayer;
      setActivePlayerNext();
    }
  }

  return (
    <div className="board" onClick={cellClicked}>
      {[...Array(9)].map((_, i): JSX.Element => (
        <div key={i} className="cell" />
      ))}
    </div>
  );
}
