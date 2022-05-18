import React from "react";

import { Link } from "react-router-dom";

function Active(props) {
  function handleBackButton(e) {
    setActiveWorkout(false, {});
  }

  const { activeWorkout, setActiveWorkout } = props;
  return (
    <>
      <Link to={{ pathname: "/workouts" }}>
        <button onClick={handleBackButton}>Back to My Workouts</button>
      </Link>
      <p>{JSON.stringify(activeWorkout.workout)}</p>
    </>
  );
}

export default Active;
