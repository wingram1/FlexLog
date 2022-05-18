import React, { useState } from "react";

import ExerciseOptions from "./subcomponents/ExerciseOptions";

function ExerciseList(props) {
  const { exerciseData, setExerciseData } = props;

  const [exerciseCounter, setExerciseCounter] = useState(1);

  const handleChange = function (e) {
    const { name, value } = e.target;

    const index = e.target.getAttribute("data-id");

    console.log(name, value, index);

    // modifies the targeted exerciseData child object
    setExerciseData({
      ...exerciseData,
      [index]: { ...exerciseData[index], [name]: value },
    });
  };

  const handleSettingChange = function (e) {
    let { name, value } = e.target;

    // changes value to true/false boolean if checked
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else if (e.target.type === "number") {
      value = parseInt(value);
    }

    const index = e.target.getAttribute("data-id");

    // modify nested settings object
    setExerciseData({
      ...exerciseData,
      [index]: {
        ...exerciseData[index],
        settings: { ...exerciseData[index].settings, [name]: value },
      },
    });

    console.log(exerciseData);
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
        settings: {
          sets: 1,
          reps: false,
          distance: false,
          timer: "",
          rest: 30,
        },
      },
    });

    // increase exercise counter
    setExerciseCounter(exerciseCounter + 1);
  };

  const removeExercise = function (e) {
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

          {/* Exercise Types */}
          <br />
          <label htmlFor="sets">Number of Sets:</label>
          <input
            name="sets"
            type="number"
            min="1"
            placeholder="1"
            data-id={exerciseData[exercise].id}
            key={`sets-${exerciseData[exercise].id}`}
            onChange={handleSettingChange}
          />
          <br />
          <label htmlFor="reps">Reps:</label>
          <input
            name="reps"
            type="checkbox"
            data-id={exerciseData[exercise].id}
            key={`reps-${exerciseData[exercise].id}`}
            onChange={handleSettingChange}
          />
          <br />
          <label htmlFor="distance">Distance:</label>
          <input
            name="distance"
            type="checkbox"
            data-id={exerciseData[exercise].id}
            key={`distance-${exerciseData[exercise].id}`}
            onChange={handleSettingChange}
          />
          <br />
          <label htmlFor="timer">Timer:</label>
          <select
            name="timer"
            data-id={exerciseData[exercise].id}
            key={`timer-${exerciseData[exercise].id}`}
            onChange={handleSettingChange}
          >
            <option value="">None</option>
            <option value="countdown">Countdown</option>
            <option value="stopwatch">Stopwatch</option>
          </select>
          <br />
          <label htmlFor="rest">Rest Interval (in seconds)</label>
          <input
            type="number"
            placeholder="30"
            data-id={exerciseData[exercise].id}
            key={`rest-${exerciseData[exercise].id}`}
            onChange={handleSettingChange}
          />

          {/* TODO: icon select (return string of local link) */}

          <br />
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
