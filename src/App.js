import React, { useState } from 'react';
import './App.css';
import UserNameEntry from './Components/UserNameEntry';
import GameBoard from './Components/GameBoard';
import SuccessScreen from './Components/SuccessScreen';

function App() {

  const [userName, setUserName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);


  const handleStartGame = (name) => {
    setUserName(name);
    setGameStarted(true);
  };

  const handleFinishGame = (finalScore, finalTime) => {
    setScore(finalScore);
    setTimeElapsed(finalTime);
    setGameFinished(true);
  };

  const handleRestartGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setScore(0);
    setTimeElapsed(0);
  };

  return (
    <div className="App">
      {!gameStarted && !gameFinished && (
        <UserNameEntry onStartGame={handleStartGame} />
      )}
      {gameStarted && !gameFinished && (
        <GameBoard onFinishGame={handleFinishGame} />
      )}
      {gameFinished && (
        <SuccessScreen
          userName={userName}
          score={score}
          timeElapsed={timeElapsed}
          onRestartGame={handleRestartGame}
        />
      )}
    </div>
  );
}

export default App;
