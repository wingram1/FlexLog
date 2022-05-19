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
    let inputEls = document.querySelectorAll("input");
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
    const type = e.target.getAttribute("data-type");
    const value = e.target.value;
    const index = parseInt(e.target.getAttribute(`data-setindex`));

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
                {/* TODO: add timer */}
                {currentExercise.settings.timer && (
                  <>
                    <p>{currentExercise.settings.timer} clock will go here</p>
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

export default Active;
