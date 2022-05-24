import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mantine/core";
import useStyles from "./ActiveWorkout.styles";

import Stopwatch from "./subcomponents/Stopwatch";
import Timer from "./subcomponents/Timer";
import { getToday, getFormattedTime } from "../../utils/dateTools";

// TODO: add set cycles (so only current set will render, but others will still be listed)

function ActiveWorkout(props) {
  const { classes } = useStyles();

  const { activeWorkout, setActiveWorkout } = props;

  if (!activeWorkout) {
    console.log("No activeWorkout found! Returning to My Workouts...");
    document.location.replace("/workouts");
  }

  // sets state for activeExercise
  const [activeExercise, setActiveExercise] = useState({
    currentIndex: 0,
    maxIndex: activeWorkout.workout.exercises.length - 1,
  });

  // sets current exercise shown
  const currentExercise =
    activeWorkout.workout.exercises[activeExercise.currentIndex];

  const [currentSet, setCurrentSet] = useState({
    currentIndex: 0,
    maxIndex: currentExercise.settings.sets - 1,
  });

  // set up variables for less cluttered render code
  const setIndex = currentSet.currentIndex;
  const maxSetIndex = currentSet.maxIndex;

  // state settings for timer
  const [timerDuration, setTimerDuration] = useState(30);
  const [timerDisplay, setTimerDisplay] = useState(false);

  // create sessionData using existing activeWorkout object
  const [sessionData, setSessionData] = useState({
    title: activeWorkout.workout.title,
    time: getFormattedTime(),
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

  function handleSetCycle(e) {
    if (timerDisplay) {
      setTimerDisplay(false);
    }

    // reset input values
    const inputEls = document.querySelectorAll("input");
    for (let i = 0; i < inputEls.length; i++) {
      inputEls[i].value = "";
    }

    const direction = e.target.getAttribute("data-id");

    let currentSetIndex = currentSet.currentIndex;

    // go back
    if (direction === "down") {
      // if above currentExercise's set 1, go back a set
      if (currentSetIndex > 0) {
        // update set
        setCurrentSet({
          ...currentSet,
          currentIndex: currentSetIndex - 1,
        });
      } else {
        // else go back an exercise and set currentSetIndex to the maxSetIndex
        const maxIndexLastSet =
          activeWorkout.workout.exercises[activeExercise.currentIndex - 1]
            .settings.sets - 1;

        setCurrentSet({
          currentIndex: maxIndexLastSet,
          maxIndex: maxIndexLastSet,
        });
        handleExerciseCycle(direction);
      }
    } else {
      // go forward
      // check if the set is the last in the exercise; if not, just change set
      if (currentSetIndex !== maxSetIndex) {
        setCurrentSet({
          ...currentSet,
          currentIndex: currentSetIndex + 1,
        });
        // if maxSetIndex, reset currentSet Index and run exercise code
      } else {
        setCurrentSet({
          currentIndex: 0,
          maxIndex:
            activeWorkout.workout.exercises[activeExercise.currentIndex + 1]
              .settings.sets - 1,
        });
        handleExerciseCycle(direction);
      }
    }
  }

  // handles cycling of exercises
  function handleExerciseCycle(direction) {
    // if currentSetIndex !== maxSetIndex, reset currentSet Index and run exercise code

    // uptick or downtick currentindex of activeExercise
    let exerciseIndex = parseInt(activeExercise.currentIndex);

    if (direction === "down") {
      // go back
      exerciseIndex--;
      setActiveExercise({ ...activeExercise, currentIndex: exerciseIndex });
    } else {
      // go forward
      exerciseIndex++;
      setActiveExercise({ ...activeExercise, currentIndex: exerciseIndex });
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

  function handleFinish() {
    console.log("Finished!");
    console.log("Final sessionData: ", sessionData);

    var mySessions = JSON.parse(localStorage.getItem("mySessions"));

    // push to localStorage
    if (!localStorage.getItem("mySessions")) {
      console.log("No sessions found! Creating localStorage database...");

      mySessions = {};
    }

    const today = getToday();

    // if no workouts today, add a new date
    if (!mySessions[today]) {
      mySessions = { ...mySessions, [today]: [] };
      // else push to today's existing date
    }

    // push sessionData to today's sessions array
    mySessions[today].push(sessionData);
    console.log(mySessions);

    // push to localStorage
    localStorage.setItem("mySessions", JSON.stringify(mySessions));

    // back to home
    document.location.replace("/");
  }

  const setData = sessionData.exercises[activeExercise.currentIndex].setData;

  // need this boolean for back button rendering
  let isFirstInWorkout = false;
  let isLastInWorkout = false;

  if (setIndex === 0 && activeExercise.currentIndex === 0) {
    isFirstInWorkout = true;
  }

  if (
    setIndex === currentSet.maxIndex &&
    activeExercise.currentIndex === activeExercise.maxIndex
  ) {
    isLastInWorkout = true;
  }

  return (
    <div className={classes.wrapper}>
      <h1>{activeWorkout.workout.title}</h1>

      {/* container for sessionData input */}
      <div className={classes.setContainer}>
        <div className={classes.setHeader}>
          <h3>{currentExercise.name}:</h3>
          <h3>
            Set {setIndex + 1} of {maxSetIndex + 1}
          </h3>
        </div>

        {currentExercise.settings.weight && (
          <>
            <label htmlFor={`set-${setIndex}-weight`}>Weight: </label>
            <div>
              <input
                type="number"
                name={`set-${setIndex}-weight`}
                placeholder={
                  setData[setIndex].weight && `${setData[setIndex].weight}`
                }
                data-type={"weight"}
                data-setindex={`${setIndex}`}
                onChange={handleChange}
              />
              <span> lbs.</span>
            </div>
          </>
        )}
        {/* render reps input */}
        {currentExercise.settings.reps && (
          <>
            <label htmlFor={`set-${setIndex}-reps`}>Reps: </label>
            <input
              type="number"
              name={`set-${setIndex}-reps`}
              placeholder={
                setData[setIndex].reps && `${setData[setIndex].reps}`
              }
              data-type={"reps"}
              data-setindex={`${setIndex}`}
              onChange={handleChange}
            />
          </>
        )}
        {/* render distance input */}
        {currentExercise.settings.distance && (
          <>
            <label htmlFor={`set-${setIndex}-distance`}>Distance: </label>
            <div>
              <input
                type="number"
                step="0.01"
                name={`set-${setIndex}-distance`}
                placeholder={
                  setData[setIndex].distance && `${setData[setIndex].distance}`
                }
                data-setindex={`${setIndex}`}
                data-type={"distance"}
                onChange={handleChange}
              />
              <span> mi.</span>
            </div>
          </>
        )}
        {/* render countdown timer */}
        {currentExercise.settings.timer === "countdown" && (
          <>
            {!timerDisplay ? (
              <div className={classes.timerForm}>
                <label htmlFor="timer-input">Set Time: </label>
                <input
                  name="timer-input"
                  id={`timer-input-${setIndex}`}
                  type="number"
                  placeholder={`${timerDuration} (seconds)`}
                />
                <button data-setindex={`${setIndex}`} onClick={startTimer}>
                  Go!
                </button>
              </div>
            ) : (
              <Timer
                classes={classes}
                handleSetCycle={handleSetCycle}
                pushToSession={pushToSession}
                timerDuration={timerDuration}
                setTimerDuration={timerDuration}
                setTimerDisplay={setTimerDisplay}
                setIndex={`${setIndex}`}
              />
            )}
          </>
        )}
        {/* render stopwatch timer */}
        {currentExercise.settings.timer === "stopwatch" && (
          <>
            <Stopwatch
              classes={classes}
              handleSetCycle={handleSetCycle}
              pushToSession={pushToSession}
              setIndex={`${setIndex}`}
            />
          </>
        )}
      </div>
      <div className={classes.setNav}>
        <div className={classes.back}>
          {/* if first set in workout, don't render back button */}
          {isFirstInWorkout ? (
            <Link to={{ pathname: "/workouts/" }}>
              <button onClick={handleBackToWorkouts}>
                Back to My Workouts
              </button>
            </Link>
          ) : (
            <button data-id="down" onClick={handleSetCycle}>
              {" "}
              🢀
            </button>
          )}
        </div>

        <div className={classes.fwd}>
          {/* if last set in workout, render finish instead of forward */}
          {isLastInWorkout ? (
            <button onClick={handleFinish}>Finish!</button>
          ) : (
            <button data-id="up" onClick={handleSetCycle}>
              🢂
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveWorkout;
