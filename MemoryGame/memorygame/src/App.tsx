import { useState } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState([
    [0, 3, 5, 1],
    [1, 2, 2, 4],
    [4, 3, 5, 0],
  ]);

  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill('')
      .map(() => new Array(grid[0].length).fill(false))
  );
  console.log('revealgrid', revealedGrid);

  const [previousClick, setPreviousClick] = useState<number | undefined>();
  const handleCardClick = (rowIndex: number, columnIndex: number) => {
    //reveal the clicked card;
    const newRevealGrid = [...revealedGrid];
    newRevealGrid[rowIndex][columnIndex] = true;

    const clickedNumber = grid[rowIndex][columnIndex];
    if (previousClick) {
      //second click ofthe 2 click;

      if (previousClick !== clickedNumber) {
        //if they both match, mark them as answered;
        setTimeout(() => {
          newRevealGrid[rowIndex][columnIndex] = false;
          setRevealedGrid(newRevealGrid);
        }, 1000);
      }
    } else {
      //first click of the 2 click;
      newRevealGrid[rowIndex][columnIndex] = true;
      setRevealedGrid(newRevealGrid);
    }
  };

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((column, columnIndex) => (
              <div
                onClick={() => handleCardClick(rowIndex, columnIndex)}
                key={columnIndex}
                className="card">
                {revealedGrid[rowIndex][columnIndex] ? column : ' '}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
