// React
import React, { useEffect, useState } from "react";

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
  const [currentGuess, setCurrentGuess] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  // Moving this outside of the useEffect, because it was capturing the
  // currentGuess when it is first initialised, which is empty.
  const handleType = (event) => {
    const { key } = event || {};
    if (key === "Enter") {
      if (currentGuess.length !== WORD_LENGTH) return;
      // TODO: Add check for solution
    }
    if (currentGuess.length === WORD_LENGTH) return;
    setCurrentGuess(currentGuess + key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [handleType]);

  return (
    <>
      <div>Wordle</div>
      <div className="tilesContainer">
        {guesses.map((guess, idx) => {
          const isCurrentGuess =
            idx === guesses.findIndex((val) => val === null);
          return (
            <Line
              key={idx}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
            />
          );
        })}
      </div>
    </>
  );
};

export default App;
