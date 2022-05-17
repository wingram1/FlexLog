import React, { useState } from "react";

import ExerciseOptions from "./subcomponents/ExerciseOptions";

function ExerciseList(props) {
  const { exerciseData, setExerciseData } = props;

  const [exerciseCounter, setExerciseCounter] = useState(1);

  const handleChange = async function (e) {
    const { name, value } = e.target;
    const index = e.target.getAttribute("data-id");

    // modifies the targeted exerciseData child object
    setExerciseData({
      ...exerciseData,
      [index]: { ...exerciseData[index], [name]: value },
    });
  };

  const addExercise = function (e) {
    e.preventDefault();

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
  };

  const removeExercise = async function (e) {
    e.preventDefault();
    // get index from remove button's data-id
    let i = e.target.getAttribute("data-id");
    // create temp object to delete the key
    let tempObj = exerciseData;

    // delete key of index
    delete tempObj[i];

    // push to exerciseData
    setExerciseData({ ...tempObj });
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
          <ExerciseOptions exList={exercise} />

          {/* TODO: TYPE select (time, sets/reps, distance(add stopwatch?)) 
                      then further TYPE settings*/}

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
