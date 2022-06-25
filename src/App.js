// React
import React, { useState } from "react";

// Styles
import "./index.css";

const WORD_LENGTH = 5;

const Line = ({ guess }) => {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const currChar = guess[i];
    tiles.push(
      <div key={i} className="tile">
        {currChar}
      </div>
    );
  }
  return <div className="line">{tiles}</div>;
};

const App = () => {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  return (
    <>
      <div>Wordle</div>
      <div className="tilesContainer">
        {guesses.map((guess, idx) => {
          return <Line key={idx} guess={guess ?? ""} />;
        })}
      </div>
    </>
  );
};

export default App;
