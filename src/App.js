import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const emptyBoard = Array(9).fill('');
  const [board, setBoard] = useState(emptyBoard);

  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [winner, setWinner] = useState('');

 
  const handleCellClick = (index) => {
    if (winner) {
      // console.log('jogo finalizado');
      return null;
    }

    if (board[index] !== '') {
      // console.log('posição ocupada');
      return null;
    }

    setBoard(
      board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  const Winner = () => {
    const waysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    waysToWin.forEach(cells => {
      if (cells.every(cell => cell === 'O')) setWinner('O venceu!')
      if (cells.every(cell => cell === 'X')) setWinner('X venceu!')
    })

    Draw();
  }

  const Draw = () => {
    if (board.every(item => item !== '')) setWinner('E');
  }

  useEffect(Winner, [board]);

  const Restart = () => {
    setCurrentPlayer('X');
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
      <main>
        <div className='title'>
          <h1>Jogo da #<span role='img'>&#128117;</span></h1>
        </div>

        <div className={`board ${winner ? 'game-over' : ''}`}>
          {board.map((item, index) => (
            <div 
              key={index}
              className={`cell ${item}`}
              onClick={() => handleCellClick(index)}>
              {item}
            </div>
          ))}
        </div>
        {winner &&
          <footer>
            {winner === 'E' ?
              <h2 className='WinningMsg'>
                <span className={winner}>Empate!</span>
              </h2>
            : 
              <h2 className='WinningMsg'>
                <span className={winner}>{winner}</span>
              </h2>
            }

            <button onClick={Restart}>Jogar Novamente</button>

          </footer>
        }
      </main>
  );
}


export default App;