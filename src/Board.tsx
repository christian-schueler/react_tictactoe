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

  function resetGame(): void {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell): void => {
      cell.textContent = "";
    });
    setActivePlayer("X");
  }

  return (
    <>
      <div className="active-player">Active Player: {activePlayer}</div>
      <div className="action"><button type="button" onClick={resetGame}>Reset Game</button></div>
      <div className="board" onClick={cellClicked}>
        {[...Array(9)].map((_, i): JSX.Element => (
          <div key={i} className="cell" />
        ))}
      </div>
    </>
  );
}
