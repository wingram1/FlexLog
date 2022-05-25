import React, { useState, useEffect } from "react";

const Stopwatch = (props) => {
  const { classes, pushToSession, setIndex } = props;

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className={classes.timerWrapper}>
      <div className={classes.stopwatch}>
        <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      {/* render buttons */}
      <div className={classes.timerButtons}>
        {!running && (
          <>
            <button
              onClick={() => {
                const type = "time";
                // sets value equal to seconds
                const value = Math.floor((time / 1000) % 60);
                const index = setIndex;

                console.log("data", { type: type, value: value, index: index });

                pushToSession(type, value, index);
                
              }}
            >
              Log Time
            </button>
            <button onClick={() => setRunning(true)}>Start</button>
          </>
        )}
        {running && <button onClick={() => setRunning(false)}>Pause</button>}
        <button
          onClick={() => {
            setTime(0);
            setRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
