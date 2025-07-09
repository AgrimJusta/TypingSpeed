import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';

const originalText = `One of the key features of our generator is the variety of topics it covers.
Whether you need a paragraph on the latest advancements in technology or an
exploration of the natural world, our generator has you covered. We are
constantly updating our database to ensure that we are providing the most
current and relevant information.`;

const TypingTest = () => {
  const [userInput, setUserInput] = useState('');
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [results, setResults] = useState('');
  const inputRef = useRef();

  const lines = originalText.split('\n');
  const inputLines = userInput.split('\n');

  const resetTest = () => {
    setUserInput('');
    setStarted(false);
    setStartTime(null);
    setEndTime(null);
    setResults('');
    inputRef.current.focus();
  };

  const handleInput = (e) => {
    const value = e.target.value;

    if (!started) {
      setStarted(true);
      setStartTime(new Date());
    }

    setUserInput(value);

    if (value.length >= originalText.length || value === originalText) {
      const end = new Date();
      setEndTime(end);

      const timeTaken = (end - startTime) / 1000;
      const wordsTyped = value.trim().split(/\s+/).length;
      const correctChars = value
        .split('')
        .filter((char, i) => char === originalText[i]).length;
      const wpm = Math.round((wordsTyped / timeTaken) * 60);
      const accuracy = Math.round((correctChars / originalText.length) * 100);

      setResults(
        `📝 Typing Complete\n⏱ Time: ${timeTaken.toFixed(2)}s\n💬 WPM: ${wpm}\n🎯 Accuracy: ${accuracy}%`
      );
    }
  };

  const renderLine = (line, lineIndex) => {
    const typedLine = inputLines[lineIndex] || '';
    const isActive = lineIndex === inputLines.length - 1;

    return (
      <div
        key={lineIndex}
        style={{
          fontWeight: isActive ? 'bold' : 'normal',
          opacity: isActive ? 1 : 0.3,
          marginBottom: '5px',
        }}
      >
        {line.split('').map((char, charIndex) => {
          const typedChar = typedLine[charIndex];
          let className = '';
          if (typedChar == null) className = '';
          else if (typedChar === char) className = 'correct';
          else className = 'incorrect';

          return (
            <span key={charIndex} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#d4fcd4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          maxWidth: '800px',
          width: '100%',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '80px', marginBottom: '10px' }} />
          <h1 style={{ color: '#333' }}>Typing Speed Calculator</h1>
        </div>

        <div
          id="text-to-type"
          style={{
            background: '#f9f9f9',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            fontSize: '18px',
            marginBottom: '20px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {lines.map(renderLine)}
        </div>

        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInput}
          placeholder="Start typing here..."
          disabled={results !== ''}
          style={{
            width: '100%',
            height: '120px',
            fontSize: '16px',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #888',
            resize: 'none',
            outline: 'none',
          }}
        ></textarea>

        <div
          id="results"
          style={{
            marginTop: '20px',
            fontSize: '18px',
            whiteSpace: 'pre-line',
            color: '#444',
          }}
        >
          {results}
        </div>

        <button
          onClick={resetTest}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </div>

      <style>{`
        .correct {
          color: green;
        }
        .incorrect {
          color: gray;
        }
      `}</style>
    </div>
  );
};

export default TypingTest;
