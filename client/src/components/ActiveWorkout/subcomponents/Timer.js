import React, { useState } from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Timer(props) {
  const {
    timerDuration,
    setTimerDuration,
    setTimerDisplay,
    pushToSession,
    setIndex,
  } = props;

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const renderTime = ({ remainingTime, elapsedTime }) => {
    if (remainingTime === 0) {
      return <div>Done!</div>;
    }

    // get integer of current elapsedTime
    let currentSecond = parseInt(elapsedTime);

    // set elapsed seconds to === currentSecond
    if (elapsedSeconds !== currentSecond) {
      console.log(elapsedSeconds);
      setElapsedSeconds(currentSecond);
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
          duration={timerDuration}
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
          <>
            {/* button to log elapsedTime */}
            <button
              onClick={() => {
                console.log(elapsedSeconds);
                const type = "time";
                const value = elapsedSeconds;
                const index = setIndex;

                // push data to sessionData
                pushToSession(type, value, index);

                // return to input screen
                setTimerDisplay(false);
              }}
            >
              Log Time
            </button>
            {/* button to reset timer */}
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
          </>
        )}
        {!timerDone ? (
          <button
            // if play/pause button is clicked, toggle timerPlaying
            onClick={() => {
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
