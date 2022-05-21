import React, { useState } from "react";
import { Link } from "react-router-dom";

import ActiveWorkout from "../components/ActiveWorkout";

function Workouts() {
  const [activeWorkout, setActiveWorkout] = useState({
    active: false,
    workout: {},
  });

  console.log(activeWorkout);

  // populates workout list
  function getWorkouts() {
    // TODO: get from localStorage, compare with database, pull/push accordingly

    let workouts = JSON.parse(localStorage.getItem("myWorkouts"));

    return workouts;
  }

  // set state to pulled workout list
  const [workoutData, setWorkoutData] = useState(getWorkouts);

  // sets a workout to active
  function startWorkout(e) {
    console.log(workoutData[e.target.getAttribute("data-id")]);

    setActiveWorkout({
      active: true,
      workout: workoutData[e.target.getAttribute("data-id")],
    });
  }

  // TODO: passes a workout through to edit page/component
  function editWorkout(e) {
    console.log(
      `Edit Workout ${
        workoutData[e.target.getAttribute("data-id")].title
      } clicked`
    );
  }

  // TODO: opens a modal to confirm, then deletes
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
    <>
      {!activeWorkout.active ? (
        <div>
          <a href="/create">
            <button>Create a New Workout</button>
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
                <h4>Category: </h4>
                <ul>
                  <li key={`category-${i}`}>{key.categories}</li>
                </ul>
                <h4>Exercises: </h4>
                <ul>
                  {/* map exercises */}
                  {workoutData[i].exercises.map((exercise, index) => (
                    <li key={`exercise-${exercise.name}-${index}`}>
                      {exercise.name}
                    </li>
                  ))}
                </ul>
                <Link to={{ pathname: "/workouts/active" }}>
                  <button data-id={i} onClick={startWorkout}>
                    Start
                  </button>
                </Link>
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
      ) : (
        <ActiveWorkout
          activeWorkout={activeWorkout}
          setActiveWorkout={setActiveWorkout}
        />
      )}
    </>
  );
}

export default Workouts;
