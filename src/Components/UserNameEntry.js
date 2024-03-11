import React, { useState } from 'react';

function UserNameEntry({ onStartGame }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStartGame(name);
    }
  };

  return (
    <div>
      <h1>Welcome to the Tile Matching Game</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default UserNameEntry;
