// SuccessScreen.js
import React from 'react';

function SuccessScreen({ userName, score, timeElapsed, onRestartGame }) {
  return (
    <div>
      <h1>Congratulations, {userName}!</h1>
      <p>Your final score: {score}</p>
      <p>Time elapsed: {timeElapsed} seconds</p>
      <button onClick={onRestartGame}>Restart Game</button>
    </div>
  );
}

export default SuccessScreen;
