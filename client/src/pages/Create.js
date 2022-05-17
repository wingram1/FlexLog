import React from "react";

function Create() {
  return (
    <div>
      <h2>Create Workout:</h2>
      <form id="workout-form">
        <label htmlFor="title">Title:</label>
        <input name="title"></input>
        <label htmlFor="description">Description:</label>
        <textarea name="description" placeholder="(optional)"></textarea>
        <div id="exercises">
          <h3>Exercises</h3>
          <p>Conditionally generated exercise inputs here</p>
        </div>
        <button
          type="submit"
          form="workout-form"
          onClick={(e) => {
            e.preventDefault();
            console.log("Submitted!");
          }}
        >
          Save Workout
        </button>
      </form>
    </div>
  );
}

export default Create;
