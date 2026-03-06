import { useState, type JSX } from 'react';
import './Board.css';

export function Board() {
  const [activePlayer, setActivePlayer] = useState((): string => 'X');
  const [playerX, setPlayerX] = useState((): number[] => []);
  const [playerO, setPlayerO] = useState((): number[] => []);

  const winningComibinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function setActivePlayerNext(): void {
    setActivePlayer((prev): string => (prev === 'X' ? 'O' : 'X'));
  }

  function cellClicked(e: React.MouseEvent<HTMLDivElement>): void {
    const cell = e.target as HTMLDivElement;
    if (cell.textContent === '') {
      cell.textContent = activePlayer;
      if (activePlayer === 'X') {
        setPlayerX((prev) => [...prev, parseInt(cell.dataset.key ?? '')]);
      } else {
        setPlayerO((prev) => [...prev, parseInt(cell.dataset.key ?? '')]);
      }

      // calculate if winning condition is met
      // check only, if minum 3 moves of the current player have been made
      if (playerX.length >= 3 || playerO.length >= 3) {
        let hasWon = false;
        if (activePlayer === 'X') {
          hasWon = winningComibinations.some((combination): boolean =>
            combination.every((num): boolean => playerX.includes(num)),
          );
        } else {
          hasWon = winningComibinations.some((combination): boolean =>
            combination.every((num): boolean => playerO.includes(num)),
          );
        }
        if (hasWon) {
          alert(`Player ${activePlayer} wins!`);
          resetGame();
        }
      }
      setActivePlayerNext();
    }
  }

  function resetGame(): void {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell): void => {
      cell.textContent = '';
    });
    setPlayerX([]);
    setPlayerO([]);
    setActivePlayer('X');
  }

  return (
    <>
      <div className="active-player">Active Player: {activePlayer}</div>
      <div className="action">
        <button type="button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className="board" onClick={cellClicked}>
        {[...Array(9)].map(
          (_, i): JSX.Element => (
            <div key={i} data-key={i} className="cell" />
          ),
        )}
      </div>
    </>
  );
}
