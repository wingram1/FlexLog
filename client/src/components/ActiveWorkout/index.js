import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";
import Stopwatch from "./subcomponents/Stopwatch";
import Timer from "./subcomponents/Timer";

// TODO: add stopwatch
// TODO: add set cycles (so only current set will render, but others will still be listed)

function ActiveWorkout(props) {
  const { activeWorkout, setActiveWorkout } = props;

  // sets state for activeExercise
  const [activeExercise, setActiveExercise] = useState({
    currentIndex: 0,
    maxIndex: activeWorkout.workout.exercises.length - 1,
  });

  // state settings for timer
  const [timerDuration, setTimerDuration] = useState(30);
  const [timerDisplay, setTimerDisplay] = useState(false);

  // sets current exercise shown
  const currentExercise =
    activeWorkout.workout.exercises[activeExercise.currentIndex];

  // create sessionData using existing activeWorkout object
  const [sessionData, setSessionData] = useState({
    title: activeWorkout.workout.title,
    // map exercise array
    exercises: activeWorkout.workout.exercises.map((key, index) => ({
      name: key.name,
      // create setData using number of sets, map over it to create nested setData objects
      setData: Array.apply(
        null,
        Array(activeWorkout.workout.exercises[index].settings.sets)
      ).map((setKey, setIndex) => ({
        setNum: setIndex + 1,
      })),
    })),
  });

  // button to go back to myWorkouts (lose progress)
  function handleBackToWorkouts(e) {
    setActiveWorkout(false, {});
  }

  // handles cycling of exercises
  function handleExerciseCycle(e) {
    // reset input values
    const inputEls = document.querySelectorAll("input");
    for (let i = 0; i < inputEls.length; i++) {
      inputEls[i].value = "";
    }

    // uptick or downtick currentindex of activeExercise
    let index = parseInt(activeExercise.currentIndex);

    if (e.target.getAttribute("data-id") === "down") {
      // go back
      index--;
      setActiveExercise({ ...activeExercise, currentIndex: index });
    } else {
      // go forward
      index++;
      setActiveExercise({ ...activeExercise, currentIndex: index });
    }
  }

  function handleChange(e) {
    // stage data for push to sessionData
    const type = e.target.getAttribute("data-type");
    const value = parseInt(e.target.value);
    const index = parseInt(e.target.getAttribute(`data-setindex`));

    // push
    pushToSession(type, value, index);
  }

  // pushes data to sessionData that gets sent to the log
  function pushToSession(type, value, index) {
    // create copy of sessionData
    const tempData = sessionData;
    // get target path variable
    const targetSet =
      tempData.exercises[activeExercise.currentIndex].setData[index];
    // push [type]: value
    const newSetData = { ...targetSet, [type]: value };

    // reassign set target to newSetData
    tempData.exercises[activeExercise.currentIndex].setData[index] = newSetData;

    // push to sessionData
    setSessionData(tempData);
    console.log(sessionData);
  }

  function startTimer(e) {
    // get value of corresponding input
    let value = document.querySelector(
      `#timer-input-${e.target.getAttribute("data-setindex")}`
    ).value;

    // if no value, set equal to previous timerDuration (or default which is 30)
    if (!value) {
      value = timerDuration;
    }

    setTimerDuration(value);
    setTimerDisplay(true);
    // console.log(timerDuration);
  }

  return (
    <>
      <Link to={{ pathname: "/workouts/" }}>
        <button onClick={handleBackToWorkouts}>Back to My Workouts</button>
      </Link>
      <h3>sessionData Object: </h3>
      <p>{JSON.stringify(sessionData)}</p>

      <h3>Active Exercise Object:</h3>
      <p>{JSON.stringify(activeExercise)}</p>
      <p>{JSON.stringify(currentExercise)}</p>

      {/* container for sessionData input */}
      <div>
        <h3>{currentExercise.name}</h3>
        {sessionData.exercises[activeExercise.currentIndex].setData.map(
          (key, index) => {
            const setData =
              sessionData.exercises[activeExercise.currentIndex].setData;
            return (
              <div key={`sets-${index}`}>
                {/* TODO: make it to where set data conditionally generates based on which set is selected */}

                <h4>Set {index + 1}:</h4>

                {/* render weight input */}
                {currentExercise.settings.weight && (
                  <>
                    <label htmlFor={`set-${index}-weight`}>Weight: </label>
                    <input
                      type="number"
                      name={`set-${index}-weight`}
                      placeholder={
                        setData[index].weight && `${setData[index].weight}`
                      }
                      data-type={"weight"}
                      data-setindex={`${index}`}
                      onChange={handleChange}
                    />
                  </>
                )}
                {/* render reps input */}
                {currentExercise.settings.reps && (
                  <>
                    <label htmlFor={`set-${index}-reps`}>Reps: </label>
                    <input
                      type="number"
                      name={`set-${index}-reps`}
                      placeholder={
                        setData[index].reps && `${setData[index].reps}`
                      }
                      data-type={"reps"}
                      data-setindex={`${index}`}
                      onChange={handleChange}
                    />
                  </>
                )}
                {/* render distance input */}
                {currentExercise.settings.distance && (
                  <>
                    <label htmlFor={`set-${index}-distance`}>Distance: </label>
                    <input
                      type="number"
                      step="0.01"
                      name={`set-${index}-distance`}
                      placeholder={
                        setData[index].distance && `${setData[index].distance}`
                      }
                      data-setindex={`${index}`}
                      data-type={"distance"}
                      onChange={handleChange}
                    />
                  </>
                )}
                {/* render countdown timer */}
                {currentExercise.settings.timer === "countdown" && (
                  <>
                    {!timerDisplay ? (
                      <>
                        <p>
                          {currentExercise.settings.timer} clock will go here
                        </p>
                        <label htmlFor="timer-input">Set Time: </label>
                        <input
                          name="timer-input"
                          id={`timer-input-${index}`}
                          type="number"
                          placeholder={`${timerDuration} (seconds)`}
                        />
                        <button data-setindex={`${index}`} onClick={startTimer}>
                          Go!
                        </button>
                      </>
                    ) : (
                      <Timer
                        pushToSession={pushToSession}
                        timerDuration={timerDuration}
                        setTimerDuration={timerDuration}
                        setTimerDisplay={setTimerDisplay}
                        setIndex={`${index}`}
                      />
                    )}
                  </>
                )}
                {/* render stopwatch timer */}
                {currentExercise.settings.timer === "stopwatch" && (
                  <>
                    <p>Stopwatch should render</p>
                    <Stopwatch
                      pushToSession={pushToSession}
                      setIndex={`${index}`}
                    />
                  </>
                )}
              </div>
            );
          }
        )}
      </div>

      {/* if currentIndex !== 0, show backtick button */}
      {activeExercise.currentIndex !== 0 ? (
        <button data-id="down" onClick={handleExerciseCycle}>
          {" "}
          🢀
        </button>
      ) : (
        <></>
      )}

      {/* if currentIndex === maxIndex, change uptick to finish */}
      {activeExercise.currentIndex !== activeExercise.maxIndex ? (
        <button data-id="up" onClick={handleExerciseCycle}>
          🢂
        </button>
      ) : (
        <button
          onClick={() => {
            console.log("Finished!");
            console.log("Final sessionData: ", sessionData);
          }}
        >
          Finish!
        </button>
      )}

      {/* TODO: pass the completed exercise through to to the log context (global state kinda deal) */}
    </>
  );
}

export default ActiveWorkout;
