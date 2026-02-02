import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(30);
  const [reps, setReps] = useState(5);
  const [timer, setTimer] = useState(seconds);
  const [repetitions, setRepetitions] = useState(reps);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (isActive && timer === 0) {
      // Sound abspielen
      const audio = new Audio('/beep.mp3');
      audio.play();
      if (repetitions > 1) {
        setRepetitions(repetitions => repetitions - 1);
        setTimer(seconds);
      } else {
        setIsActive(false);
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer, repetitions, seconds]);

  const handleStart = () => {
    setTimer(seconds);
    setRepetitions(reps);
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimer(seconds);
    setRepetitions(reps);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sport-Timer</h1>
        <div className="settings">
          <div className="setting">
            <label>Sekunden: {seconds}</label>
            <input 
              type="range" 
              min="0" 
              max="180" 
              value={seconds} 
              onChange={(e) => setSeconds(parseInt(e.target.value))}
            />
          </div>
          <div className="setting">
            <label>Wiederholungen: {reps}</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={reps} 
              onChange={(e) => setReps(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="timer">
          <div className="time-display">{timer}s</div>
          <div className="reps-display">Wiederholungen: {repetitions}</div>
        </div>
        <div className="controls">
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </header>
    </div>
  );
}

export default App;
