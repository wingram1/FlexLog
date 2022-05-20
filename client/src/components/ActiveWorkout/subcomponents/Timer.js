import React, { useState } from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

// TODO: pass duration in from user input on parent ActiveWorkout component

function Timer() {
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div>Done!</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const [timerPlaying, setTimerPlaying] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  const [key, setKey] = useState(0);

  return (
    <div className="App">
      <h1>
        Timer
        <br />
      </h1>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          key={key}
          isPlaying={timerPlaying ? true : false}
          duration={5}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={() => {
            console.log("complete");
            setTimerPlaying(false);
            setTimerDone(true);
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <div className="button-wrapper">
        {/* if timer is not playing, render restart button */}
        {timerPlaying ? (
          <></>
        ) : (
          <button
            // if restart button is clicked, set key to restart the timer
            onClick={() => {
              // resets duration
              setKey((prevKey) => prevKey + 1);
              //   toggle timer to play
              //   setTimerPlaying(true);
              setTimerDone(false);
            }}
          >
            Reset Timer
          </button>
        )}
        {!timerDone ? (
          <button
            // if play/pause button is clicked, toggle timerPlaying
            onClick={() => {
              console.log("push");

              setTimerPlaying(timerPlaying ? false : true);
              //   if timer is done, set timer to not done
              if (timerDone) {
                setTimerDone(false);
              }
            }}
          >
            {timerPlaying ? "Pause" : "Play"}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Timer;
