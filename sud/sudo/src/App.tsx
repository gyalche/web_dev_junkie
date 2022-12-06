import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const setGridValue = (rowIndex: number, colIndex: number, value: number) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = value;
    setGrid(newGrid);
  };
  const solvePuzzle = () => {
    fetch('http://127.0.0.1:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sudoku: [],
      }),
    });
  };
  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((number, colIndex) => (
              <div className="cell" key={colIndex}>
                <input
                  type="number"
                  value={number}
                  onChange={(e: any) =>
                    setGridValue(
                      rowIndex,
                      colIndex,
                      parseInt(e.target.value || 0)
                    )
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={solvePuzzle}>Solve</button>
    </div>
  );
}

export default App;
