import React, { useState } from "react";

import ExerciseOptions from "./subcomponents/ExerciseOptions";

function ExerciseList() {
  const [exerciseData, setExerciseData] = useState({
    0: {
      id: 0,
      name: "",
      icon: "",
      exerciseType: [],
    },
  });

  const [exerciseCounter, setExerciseCounter] = useState(1);

  const handleChange = async function (e) {
    const { name, value } = e.target;
    const index = e.target.getAttribute("data-id");

    // modifies the targeted exerciseData child object
    setExerciseData({
      ...exerciseData,
      [index]: { ...exerciseData[index], [name]: value },
    });

    console.log(exerciseData);
  };

  const addExercise = function (e) {
    e.preventDefault();
    console.log("exerciseCounter: " + exerciseCounter);
    console.log(exerciseData);

    // push new exercise object to exerciseData
    setExerciseData({
      ...exerciseData,
      [exerciseCounter]: {
        id: exerciseCounter,
        name: "",
        icon: "",
        exerciseType: [],
      },
    });

    // increase exercise counter
    setExerciseCounter(exerciseCounter + 1);
    // TODO: use State to push additional exercise nodes
    // TODO: find a way to assign them unique id's. Probably another useState call that's an exercise counter
  };

  const removeExercise = async function (e) {
    e.preventDefault();
    console.log("Remove exercise clicked");
    // TODO: grab parent div id and delete; adjust state to splice the object
  };

  return (
    <div id="exercise-list">
      <h3>Exercises</h3>
      {/* container for individual exercise */}
      {Object.keys(exerciseData).map((exercise, i) => (
        <div
          data-id={`exercise-${exerciseData[exercise].id}`}
          key={`container-${exerciseData[exercise].id}`}
        >
          {/* this is an individual exercise node generated by default */}
          <label htmlFor="exercises">
            Choose an exercise (or input your own!)
          </label>
          <input
            list={`list-${exercise}`}
            name="name"
            data-id={exerciseData[exercise].id}
            key={`name-${exerciseData[exercise].id}`}
            onChange={handleChange}
          ></input>
          <ExerciseOptions exList={0} />
          {/* TODO: TYPE (time, sets/reps, distance(add stopwatch?)) */}
          {/* TODO: icon select (return string of local link) */}

          <button onClick={removeExercise} data-id={exerciseData[exercise].id}>
            Remove
          </button>
        </div>
      ))}

      {/* button to add another individual exercise node */}
      <button onClick={addExercise}>Add another exercise</button>
    </div>
  );
}

export default ExerciseList;
