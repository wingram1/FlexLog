import React, { useContext } from "react";

import { Link } from "react-router-dom";

function Active(props) {
  const { activeWorkout, setActiveWorkout } = props;

  // button to go back to myWorkouts (lose progress)
  function handleBackButton(e) {
    setActiveWorkout(false, {});
  }

  return (
    <>
      <Link to={{ pathname: "/workouts" }}>
        <button onClick={handleBackButton}>Back to My Workouts</button>
      </Link>

      <p>{JSON.stringify(activeWorkout.workout)}</p>

      {/* TODO: use State to cycle through exercises */}

      {/* TODO: pass the completed exercise through to to the log context (global state kinda deal) */}
    </>
  );
}

export default Active;
