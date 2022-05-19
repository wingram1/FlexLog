import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";

function Active(props) {
  const { activeWorkout, setActiveWorkout } = props;

  // sets state for activeExercise
  const [activeExercise, setActiveExercise] = useState({
    currentIndex: 0,
    maxIndex: activeWorkout.workout.exercises.length - 1,
  });

  // sets current exercise shown
  const currentExercise =
    activeWorkout.workout.exercises[activeExercise.currentIndex];

  // create activeWorkoutData using existing activeWorkout object
  const [activeWorkoutData, setActiveWorkoutData] = useState({
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

  return (
    <>
      <Link to={{ pathname: "/workouts/" }}>
        <button onClick={handleBackToWorkouts}>Back to My Workouts</button>
      </Link>
      <h3>activeWorkoutData Object: </h3>
      <p>{JSON.stringify(activeWorkoutData)}</p>

      {/* TODO: use State to cycle through exercises */}
      <h3>Active Exercise Object:</h3>
      <p>{JSON.stringify(activeExercise)}</p>
      <p>{JSON.stringify(currentExercise)}</p>

      {/* if currentIndex !== 0, show backtick option */}
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
          }}
        >
          Finish!
        </button>
      )}

      {/* TODO: pass the completed exercise through to to the log context (global state kinda deal) */}
    </>
  );
}

export default Active;
