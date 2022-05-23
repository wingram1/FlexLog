import React, { useState } from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Timer(props) {
  const {
    classes,
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
      // update elapsed seconds
      setElapsedSeconds(currentSecond);
    }

    return (
      <div className={classes.timerInternal}>
        <h4>
          Remaining: <br />
          <span className={classes.time}>{remainingTime}</span>
          <br />
          seconds
        </h4>
      </div>
    );
  };

  const [timerPlaying, setTimerPlaying] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  const [key, setKey] = useState(0);

  return (
    <>
      <div className={classes.timerContainer}>
        <div className={classes.timerWrapper}>
          <CountdownCircleTimer
            key={key}
            isPlaying={timerPlaying ? true : false}
            duration={timerDuration}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            size={230}
            style={{ margin: "0 auto" }}
            onComplete={() => {
              console.log("complete");
              setTimerPlaying(false);
              setTimerDone(true);
            }}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>
      <div className={classes.timerButtons}>
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
    </>
  );
}

export default Timer;
