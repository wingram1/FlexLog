import React, { useState } from "react";

import ExerciseList from "../components/ExerciseList";

function Create() {
  // TODO: create a formState variable and have it update onChange
  // TODO: pass down setState to ExerciseList via props so it can update it as well

  const submitForm = function (e) {
    e.preventDefault();

    // TODO: scrap this and just push the formState that you've been onChanging to
    let formData = {
      title: document.querySelector("#title").value,
      description: document.querySelector("#description").value,
    };

    console.log("Submitted!", formData);
  };

  return (
    <div>
      <h2>Create Workout:</h2>
      <form id="workoutForm">
        <label htmlFor="title">Title:</label>
        <input name="title" id="title"></input>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          placeholder="(optional)"
          id="description"
        ></textarea>
        <div id="">
          <h3>Exercises</h3>
          <p>Conditionally generated exercise inputs here</p>
          <ExerciseList />
          <div id="exerciseList"></div>
        </div>
        <button type="submit" form="workout-form" onClick={submitForm}>
          Save Workout
        </button>
      </form>
    </div>
  );
}

export default Create;
