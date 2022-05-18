import React, { useState } from "react";

function Workouts() {
  function getWorkouts() {
    // TODO: get from localStorage, compare with database, pull/push accordingly

    let workouts = JSON.parse(localStorage.getItem("myWorkouts"));

    return workouts;
  }

  const [workoutData, setWorkoutData] = useState(getWorkouts);

  function startWorkout(e) {
    console.log(
      `Start Workout ${
        workoutData[e.target.getAttribute("data-id")].title
      } clicked`
    );
  }

  function editWorkout(e) {
    console.log(
      `Edit Workout ${
        workoutData[e.target.getAttribute("data-id")].title
      } clicked`
    );
  }

  function deleteWorkout(e) {
    console.log(
      `Delete Workout ${
        workoutData[e.target.getAttribute("data-id")].title
      } clicked`
    );
  }

  // log workoutData
  console.log(workoutData);

  return (
    <div>
      <a href="/create">
        <button>Create a New Workout</button>
      </a>
      {/* take to explore page; if not logged in, take to login page */}
      <a href="/explore">
        <button>Explore!</button>
      </a>
      <div>
        <h2>My Workouts</h2>
        {/* map workouts inside here */}
        {workoutData.map((key, i) => (
          <div>
            <h3 data-id={i} key={`title-${i}`}>
              {key.title}
            </h3>
            <p data-id={i} key={`desc-${i}`}>
              {key.description}
            </p>
            <h4>Categories: </h4>
            <h4>Exercises: </h4>
            <ul>
              {/* map exercises */}
              {workoutData[i].exercises.map((exercise, index) => (
                <li key={`exercise-${index}-${exercise.name}`}>
                  {exercise.name}
                </li>
              ))}
            </ul>
            <button data-id={i} onClick={startWorkout}>
              Start
            </button>
            <button data-id={i} onClick={editWorkout}>
              Edit
            </button>
            <button data-id={i} onClick={deleteWorkout}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
