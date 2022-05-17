import React, { useState } from "react";

import ExerciseList from "../components/ExerciseList";

function Create() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: "",
    exercises: [{}],
  });

  const [exerciseData, setExerciseData] = useState({
    0: {
      id: 0,
      name: "",
      icon: "",
      exerciseType: [],
    },
  });

  const handleChange = function (e) {
    //   get name attribute and value from target
    const { name, value } = e.target;

    // update formData
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = function (e) {
    e.preventDefault();

    // return new array with updated id's to equal index
    const exercises = Object.keys(exerciseData).map((key, index) => {
      return {
        id: index,
        name: exerciseData[key].name,
        icon: exerciseData[key].icon,
        exerciseType: exerciseData[key].exerciseType,
      };
    });

    const submittedFormData = {
      title: formData.title,
      description: formData.description,
      categories: formData.categories,
      exercises: exercises,
    };

    // TODO: log to console for now; push to database later
    console.log(submittedFormData);
  };

  return (
    <div>
      <h2>Create Workout:</h2>
      <form id="workoutForm">
        <label htmlFor="title">Title:</label>
        <input name="title" id="title" onChange={handleChange}></input>
        <label htmlFor="categories">
          Choose a category that fits your workout:
        </label>
        <select name="categories" id="categories" onChange={handleChange}>
          <option value="">(optional)</option>
          <option value="Home">Home</option>
          <option value="Gym">Gym</option>
          <option value="Office">Office</option>
          <option value="No Equipment">No Equipment</option>
          <option value="Light Equipment">Light Equipment</option>
          <option value="Heavy Equipment">Heavy Equipment</option>
          <option value="Cardio">Cardio</option>
        </select>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          placeholder="(optional)"
          id="description"
          onChange={handleChange}
        ></textarea>
        <ExerciseList
          exerciseData={exerciseData}
          setExerciseData={setExerciseData}
        />
        <button type="submit" form="workout-form" onClick={submitForm}>
          Save Workout
        </button>
      </form>
    </div>
  );
}

export default Create;
