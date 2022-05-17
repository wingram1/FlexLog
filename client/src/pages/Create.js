import React, { useState } from "react";

import ExerciseList from "../components/ExerciseList";

function Create() {
    
  // TODO: create a formState variable and have it update onChange
  // TODO: pass down setState to ExerciseList via props so it can update it as well
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: [],
    exercises: [{}],
  });

  const handleChange = function (e) {
    // console.log(formData);
    console.log(e.target);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    console.log(formData);
  };

  const submitForm = function (e) {
    e.preventDefault();

    // TODO: push the formState that you've been onChanging to
    console.log("Submitted. Final object:", formData);
  };

  return (
    <div>
      <h2>Create Workout:</h2>
      <form id="workoutForm">
        <label htmlFor="title">Title:</label>
        <input name="title" id="title" onChange={handleChange}></input>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          placeholder="(optional)"
          id="description"
          onChange={handleChange}
        ></textarea>
        {/* TODO: pass handleChange as props */}
        <ExerciseList formData={formData} setFormData={setFormData} />
        <button type="submit" form="workout-form" onClick={submitForm}>
          Save Workout
        </button>
      </form>
    </div>
  );
}

export default Create;
