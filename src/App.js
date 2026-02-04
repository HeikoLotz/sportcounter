import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(30);
  const [reps, setReps] = useState(5);
  const [pauseDuration, setPauseDuration] = useState(4);
  const [timer, setTimer] = useState(seconds);
  const [repetitions, setRepetitions] = useState(reps);
  const [isActive, setIsActive] = useState(false);
  const [isPausePhase, setIsPausePhase] = useState(false);

  useEffect(() => {
    let interval = null;

    if (!isActive) {
      return () => clearInterval(interval);
    }

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else { // timer is 0
      if (isPausePhase) {
        // Pause phase finished, start next rep
        setIsPausePhase(false);
        setTimer(seconds);
      } else {
        // Exercise phase finished
        const audio = new Audio(process.env.PUBLIC_URL + '/beep.mp3');
        audio.play();

        if (repetitions > 1) {
          // It was not the last rep, start a pause
          setIsPausePhase(true);
          setTimer(pauseDuration);
          setRepetitions(r => r - 1);
        } else {
          // It was the last rep, stop everything
          setIsActive(false);
        }
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timer, isPausePhase, repetitions, seconds, pauseDuration]);

  const handleStart = () => {
    setTimer(seconds);
    setRepetitions(reps);
    setIsPausePhase(false);
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPausePhase(false);
    setTimer(seconds);
    setRepetitions(reps);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sport-Timer</h1>
        <div className="settings">
          <div className="setting">
            <label>Dauer: {seconds}</label>
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
          <div className="setting">
            <label>Pause (s): {pauseDuration}</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={pauseDuration} 
              onChange={(e) => setPauseDuration(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="timer">
          <div className={isPausePhase ? "time-display pause-display" : "time-display"}>{isPausePhase ? `Pause: ${timer}` : `${timer}`}</div>
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
