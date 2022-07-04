// React
import React, { useCallback, useEffect, useState } from 'react';

// Styles
import './index.css';

const WORD_LENGTH = 5;

// TODO: Move this to a separate component
const Line = ({ guess, isEntered, solution }) => {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const currChar = guess[i];
    let tileClass = 'tile';
    if (isEntered) {
      if (currChar === solution[i]) {
        tileClass += ' correct';
      } else if (solution.includes(currChar)) {
        tileClass += ' contains';
      } else {
        tileClass += ' incorrect';
      }
    }
    tiles.push(
      <div key={i} className={tileClass}>
        {currChar}
      </div>
    );
  }
  return <div className="line">{tiles}</div>;
};

const App = () => {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  // TODO: Change this to fetch/randomise from a set of words
  const [solution] = useState('world');

  // Moving this outside of the useEffect, because it was capturing the
  // currentGuess when it is first initialised, which is empty. The fix
  // can be adding currentGuess to the dependency array, but this means
  // the event listener will get added and removed everytime the currentGuess
  // changed.
  const handleType = useCallback(
    (event) => {
      if (isFinished) {
        return;
      }
      const { key } = event || {};
      if (key === 'Enter') {
        // currentGuess was always referring to the old value when it is not
        // specified in the dependency array, since this function will only
        // be initialised once, the first time it's being run.
        if (currentGuess.length !== WORD_LENGTH) return;
        const newGuesses = [...guesses];
        const insertIdx = newGuesses.findIndex((val) => val === null);
        newGuesses[insertIdx] = currentGuess;
        setGuesses(newGuesses);
        console.log(newGuesses);
        if (currentGuess === solution) {
          setIsFinished(true);
          setCurrentGuess('');
          return;
        }
        setCurrentGuess('');
      }
      if (key === 'Backspace') {
        setCurrentGuess((oldCurrentGuess) => oldCurrentGuess.slice(0, oldCurrentGuess.length - 1));
        return;
      }
      if (currentGuess.length >= WORD_LENGTH) return;
      const keyOrd = event.key.toLowerCase().charCodeAt(0);
      const isLetter = keyOrd >= 65 && keyOrd <= 123;
      if (!isLetter) return;
      // Since we want this function to only created once thus the empty deps array
      // with the addition of useCallback, we need to have a way to reference the old
      // currentGuess. Since if we don't do it this way, then it means the function will
      // refer the currentGuess when it is first created.
      setCurrentGuess((oldCurrentGuess) => oldCurrentGuess + key);
    },
    [currentGuess]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleType);
    console.log('add listener');

    return () => {
      console.log('remove listener');
      window.removeEventListener('keydown', handleType);
    };
  }, [handleType]);

  return (
    <>
      <div>Wordle</div>
      <div className="tilesContainer">
        {guesses.map((guess, idx) => {
          const isCurrentGuess = idx === guesses.findIndex((val) => val === null);
          return (
            <Line
              key={`line-${idx}`}
              guess={isCurrentGuess ? currentGuess : guess ?? ''}
              isEntered={!isCurrentGuess && guess}
              solution={solution}
            />
          );
        })}
      </div>
    </>
  );
};

export default App;
