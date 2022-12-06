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
  const solvePuzzle = async () => {
    const response = fetch('http://127.0.0.1:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sudoku: [],
      }),
    });

    const json = await response.json();
    const solution = json.data[0].solution;
    const newGrid = new Array(9).fill('').map(() => new Array(9).fill(0));
    debugger;

    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        newGrid[i][j] = parseInt(solution.charAt(i * 9 + j));
      }
    }

    setGrid(newGrid);
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
