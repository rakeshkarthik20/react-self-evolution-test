import React, { useState, useEffect } from 'react';
import './GameBoard.css'; 

const TILE_COUNT = 12;
const tiles = Array.from({ length: TILE_COUNT / 2 }).flatMap((_, index) => [
  { id: `tile${index}`, type: `type${index}` },
  { id: `tile${index + TILE_COUNT / 2}`, type: `type${index}` },
]);

function GameBoard({ onFinishGame }) {
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTileClick = (id, type) => {
    if (selectedTiles.length === 2 || matchedTiles.includes(id)) return;

    setSelectedTiles((prevSelectedTiles) => [...prevSelectedTiles, { id, type }]);
  };

  useEffect(() => {
    if (selectedTiles.length === 2) {
      const [firstTile, secondTile] = selectedTiles;

      if (firstTile.type === secondTile.type) {
        setMatchedTiles((prevMatchedTiles) => [...prevMatchedTiles, firstTile.id, secondTile.id]);
        setScore((prevScore) => prevScore + 1);
      } else {
        setTimeout(() => {
          setScore((prevScore) => Math.max(0, prevScore - 1));
        }, 1000);
      }

      setTimeout(() => {
        setSelectedTiles([]);
      }, 1000);
    }
  }, [selectedTiles]);

  useEffect(() => {
    if (matchedTiles.length === TILE_COUNT) {
      onFinishGame(score, timeElapsed);
    }
  }, [matchedTiles, onFinishGame, score, timeElapsed]);

  return (
    <div>
      <h2>Game Board Component</h2>
      <p>Score: {score}</p>
      <p>Time Elapsed: {timeElapsed} seconds</p>
      <div className="board">
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            id={tile.id}
            type={tile.type}
            selected={selectedTiles.some((selectedTile) => selectedTile.id === tile.id)}
            matched={matchedTiles.includes(tile.id)}
            onClick={handleTileClick}
          />
        ))}
      </div>
    </div>
  );
}

function Tile({ id, type, selected, matched, onClick }) {
  const handleClick = () => {
    if (!selected && !matched) {
      onClick(id, type);
    }
  };

  return (
    <div className={`tile ${selected || matched ? 'selected' : ''}`} onClick={handleClick}>
      {matched || selected ? type : ''}
    </div>
  );
}

export default GameBoard;
