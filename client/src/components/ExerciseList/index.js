import React, { useState } from "react";

import { Button, Switch } from "@mantine/core";
import useStyles from "./ExerciseList.styles.js";

import ExerciseOptions from "./subcomponents/ExerciseOptions";

function ExerciseList(props) {
  const { classes } = useStyles();

  const { formData, exerciseData, setExerciseData } = props;

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

    // get index from remove button's data-id (compensated for Mantine's Button component with two parentNodes)
    let i = e.target.parentNode.parentNode.getAttribute("data-id");

    // create temp object to delete the key
    let tempObj = exerciseData;

    // delete key of index
    delete tempObj[i];

    // push to exerciseData
    setExerciseData({ ...tempObj });
  };

  return (
    <div id="exercise-list" className={classes.listContainer}>
      <h3>Exercises {formData.title && <span>for {formData.title}</span>}</h3>
      {/* container for individual exercise */}
      {Object.keys(exerciseData).map((exercise, i) => (
        <div
          data-id={`exercise-${exerciseData[exercise].id}`}
          key={`container-${exerciseData[exercise].id}`}
          className={classes.exerciseContainer}
        >
          <div className={classes.inputContainer}>
            <label className={classes.label} htmlFor="exercises">
              Choose an exercise (or input your own!)
            </label>
            <input
              list={`list-${exercise}`}
              name="name"
              className={classes.input}
              data-id={exerciseData[exercise].id}
              key={`name-${exerciseData[exercise].id}`}
              onChange={handleChange}
            ></input>
            <ExerciseOptions exList={exercise} />
          </div>

          {/* Exercise Types */}
          <br />
          <div className={classes.inputContainer}>
            <label
              className={classes.label}
              htmlFor="sets"
              style={{ "font-weight": 500 }}
            >
              Number of Sets:
            </label>
            <input
              name="sets"
              type="number"
              className={classes.input}
              min="1"
              placeholder="1"
              data-id={exerciseData[exercise].id}
              key={`sets-${exerciseData[exercise].id}`}
              onChange={handleSettingChange}
            />
          </div>
          <br />
          <strong>
            <p>Additional Settings:</p>
          </strong>
          <div className={classes.settings}>
            <label className={classes.label} htmlFor="reps">
              Reps:
            </label>
            <Switch
              name="reps"
              data-id={exerciseData[exercise].id}
              key={`reps-${exerciseData[exercise].id}`}
              onChange={handleSettingChange}
            />
            {/* TODO: add weight setting */}
            <br />
            <label className={classes.label} htmlFor="weight">
              Weight:
            </label>
            <Switch
              name="weight"
              data-id={exerciseData[exercise].id}
              key={`weight-${exerciseData[exercise].id}`}
              onChange={handleSettingChange}
            />
            <br />
            <label className={classes.label} htmlFor="distance">
              Distance:
            </label>
            <Switch
              name="distance"
              type="checkbox"
              data-id={exerciseData[exercise].id}
              key={`distance-${exerciseData[exercise].id}`}
              onChange={handleSettingChange}
            />
            <br />
            <label className={classes.label} htmlFor="timer">
              Timer:
            </label>
            <select
              name="timer"
              className={classes.select}
              data-id={exerciseData[exercise].id}
              key={`timer-${exerciseData[exercise].id}`}
              onChange={handleSettingChange}
            >
              <option value="">None</option>
              <option value="countdown">Countdown</option>
              <option value="stopwatch">Stopwatch</option>
            </select>
            <br />
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.label} htmlFor="rest">
              Rest Interval (in seconds)
            </label>
            <input
              className={classes.input}
              type="number"
              placeholder="30"
              min="0"
              data-id={exerciseData[exercise].id}
              key={`rest-${exerciseData[exercise].id}`}
              onChange={handleSettingChange}
            />
          </div>

          {/* TODO: icon select (return string of local link) */}

          <br />
          <div className={classes.removeButton}>
            <Button
              color="red"
              onClick={removeExercise}
              data-id={exerciseData[exercise].id}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      {/* button to add another individual exercise node */}
      <Button color="gray" onClick={addExercise}>
        Add another exercise
      </Button>
    </div>
  );
}

export default ExerciseList;
